package hu.szakdolgozat.btsz.controller

import hu.szakdolgozat.btsz.config.PasswordHasher
import hu.szakdolgozat.btsz.model.Gender
import hu.szakdolgozat.btsz.model.LoginRequest
import hu.szakdolgozat.btsz.model.MyUserDetails
import hu.szakdolgozat.btsz.model.User
import hu.szakdolgozat.btsz.repository.EventRepository
import hu.szakdolgozat.btsz.service.*
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@CrossOrigin(origins = ["\${btsz.frontendUrl:http://127.0.0.1:3000}"], allowedHeaders = ["*"])
@RequestMapping("/api")
class UserController(
    private val userService: UserService,
    private val eventService: EventService,
    private val uploadService: UploadService,
    @Value("\${app.jwtSecret}") private val jwtSecret: String,
    @Autowired
    private val jwtTokenProvider: JwtTokenProvider,
    private val passwordHasher: PasswordHasher
) {

    @PostMapping("/auth/logout")
    fun logout(auth: Authentication?): ResponseEntity<String> {
        val user = auth?.getUserOrNull()
        try {
            val expiration = Date()
            val invalidToken = Jwts.builder()
                .setExpiration(expiration)
                .signWith(Keys.hmacShaKeyFor(jwtSecret.toByteArray(Charsets.UTF_8)))
                .compact()

            return ResponseEntity.ok("Kijelentkezés sikeres")
        } catch (e: Exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Kijelentkezés sikertelen: ${e.message}")
        }
    }

    @PostMapping("/auth/login")
    fun login(@RequestBody request: LoginRequest): ResponseEntity<*> {
        val user = userService.findByUsername(request.username)
        val hashedPassword = passwordHasher.hashPassword(request.password)

        val redirectUrl = "/profil"
        return if (user != null && hashedPassword == user.password) {
            val username = user.username
            val token = jwtTokenProvider.generateToken(user)
            val role = user.role
            val team = user.team
            val email = user.email

            val response = mapOf(
                "actualUser" to username,
                "token" to token, "role" to role,
                "email" to email, "team" to team,
                "redirectUrl" to redirectUrl
            )

            ResponseEntity.ok(response)
        } else {
            ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Hibás felhasználónév vagy jelszó")
        }
    }

    @PostMapping("/users")
    fun createUser(@RequestBody newUser: User, auth: Authentication?): ResponseEntity<*> {
        val user = auth?.getUserOrNull()
        if (user?.role == "admin") {
            try {
                if (newUser.username.isBlank() || newUser.password.isBlank()) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Hiányzó vagy érvénytelen adatok")
                }

                val existingUser = userService.findByUsername(newUser.username)
                if (existingUser != null) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Már létező felhasználónév")
                }

                val passwordHasher = PasswordHasher()
                val hashedPassword = passwordHasher.hashPassword(newUser.password)
                newUser.password = hashedPassword

                val createdUser = userService.createUser(newUser)

                return ResponseEntity.status(HttpStatus.CREATED).body(createdUser)
            } catch (e: Exception) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Felhasználó létrehozása sikertelen: ${e.message}")
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Hozzáférés megtagadva")
        }
    }

    @DeleteMapping("/users")
    fun deleteUserByUsername(
        @RequestBody username: String,
        auth: Authentication?
    ): ResponseEntity<*> {
        val user = auth?.getUserOrNull()
        if (user?.role == "admin") {
            try {
                val updatedUsername =  username.removeSurrounding("\"")
                val teamName = userService.findTeamNameByUsername(updatedUsername)
                val eventsReferencingUser = teamName?.let { eventService.findEventsByTeam(it) }

                if (eventsReferencingUser != null) {
                    for (event in eventsReferencingUser) {
                        event.id?.let { uploadService.deleteUploadsByEventId(it) }
                        event.id?.let { eventService.deleteResultsByEventId(it) }
                        event.id?.let { eventService.deleteEvent(it) }
                    }
                }
                userService.deleteUserByUsername(updatedUsername)


                return ResponseEntity.ok("Felhasználó sikeresen törölve!")
            } catch (e: Exception) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Felhasználó törlése sikertelen: ${e.message}")
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Hozzáférés megtagadva")
        }
    }


    @PutMapping("/users/{username}")
    fun updateUserByUsername(
        @PathVariable username: String,
        @RequestBody updatedUser: User,
        auth: Authentication?
    ): ResponseEntity<*> {
        val user = auth?.getUserOrNull()
        if (user?.role == "admin") {
            try {
                if (updatedUser.username.isBlank() || updatedUser.password.isBlank()) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Hiányzó vagy érvénytelen adatok")
                }

                val existingUser = userService.findByUsername(updatedUser.username)
                if (existingUser != null && existingUser.username != username) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Ez a felhasználónév már foglalt")
                }

                val passwordHasher = PasswordHasher()
                val hashedPassword = passwordHasher.hashPassword(updatedUser.password)
                updatedUser.password = hashedPassword

                val teamEvents = existingUser?.let { eventService.findEventsByTeam(it.team) }

                teamEvents?.forEach { event ->
                    if (event.team1 == existingUser.team) {
                        event.team1 = updatedUser.team
                    }
                    if (event.team2 == existingUser.team) {
                        event.team2 = updatedUser.team
                    }
                }

                teamEvents?.let { eventService.saveAll(it) }

                val updatedUserResult = userService.updateUserByUsername(username, updatedUser)
                return ResponseEntity.ok(updatedUserResult)
            } catch (e: Exception) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Felhasználó módosítása sikertelen: ${e.message}")
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Hozzáférés megtagadva")
        }
    }

    @GetMapping("/users")
    fun getAllUsers(auth: Authentication?): ResponseEntity<List<MyUserDetails>> {
        val user = auth?.getUserOrNull()

        if (user?.role == "admin") {
            try {
                val users = userService.getAllUsers()
                val userDetailsList = users.map { user ->
                    MyUserDetails(
                        id = user.id,
                        username = user.username,
                        email = user.email,
                        role = user.role,
                        team = user.team,
                        gender = user.gender
                    )
                }
                return ResponseEntity.ok(userDetailsList)
            } catch (e: Exception) {
                println("Error occurred: ${e.message}")
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(emptyList())
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(emptyList())
        }
    }

    @GetMapping("/teams")
    fun getTeamNames(): ResponseEntity<Map<Gender, List<String>>> {
        val teams = userService.getTeams()
        val maleTeamNames = teams.filter { it.gender == Gender.Male }.mapNotNull { it.team }
        val femaleTeamNames = teams.filter { it.gender == Gender.Female }.mapNotNull { it.team }
        val result = mapOf(
            Gender.Male to maleTeamNames,
            Gender.Female to femaleTeamNames
        )
        return ResponseEntity.ok(result)
    }

}
