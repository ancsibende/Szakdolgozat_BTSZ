package hu.szakdolgozat.btsz.service

import hu.szakdolgozat.btsz.config.PasswordHasher
import hu.szakdolgozat.btsz.model.MyUserDetails
import hu.szakdolgozat.btsz.model.User
import hu.szakdolgozat.btsz.repository.UserRepository
//import org.springframework.security.core.userdetails.UserDetails
//import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Service
//import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.transaction.annotation.Transactional

@Service
class UserService(private val userRepository: UserRepository)  {

    fun getTeams(): MutableIterable<User> {
        return userRepository.findAll()
    }

    fun findByUsername(username: String): User? {
        return userRepository.findByUsername(username)
    }

    @Transactional
    fun updateUserByUsername(username: String, updatedUser: User): User {
        val existingUser = userRepository.findByUsername(username)

        if (existingUser != null) {
            existingUser.username = updatedUser.username
            existingUser.email = updatedUser.email
            existingUser.password = updatedUser.password
            existingUser.role = updatedUser.role
            existingUser.team = updatedUser.team
            existingUser.gender = updatedUser.gender

            userRepository.save(existingUser)
            return existingUser
        } else {
            throw IllegalArgumentException("Nem található felhasználó a megadott felhasználónévvel: $username")
        }
    }

    fun getAllUsers(): List<MyUserDetails> {
        val users = userRepository.findAll()
        return users.map { user ->
            MyUserDetails(
                id = user.id?:0,
                username = user.username,
                email = user.email,
                role = user.role,
                gender = user.gender?.toString() ?: "N/A",
                team = user.team
            )
        }
    }

    fun createUser(newUser: User): User {
        val existingUser = userRepository.findByUsername(newUser.username)
        if (existingUser != null) {
            throw IllegalArgumentException("Már létező felhasználónév")
        }

        return userRepository.save(newUser)
    }

    @Transactional
    fun deleteUserByUsername(username: String) {
        userRepository.deleteByUsername(username)
    }

    fun findTeamNameByUsername(username: String): String? {

        val user = userRepository.findByUsername(username)
        return user?.team
    }
}
