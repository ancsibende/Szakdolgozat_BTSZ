package hu.szakdolgozat.btsz.service

import hu.szakdolgozat.btsz.model.MyUserDetails
import hu.szakdolgozat.btsz.model.User
import io.jsonwebtoken.*
import io.jsonwebtoken.security.Keys
import jakarta.servlet.http.HttpServletRequest
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.stereotype.Service
import java.util.*

const val JWT_CLAIM_ID = "id"
const val JWT_CLAIM_EMAIL = "email"
const val JWT_CLAIM_ROLE = "role"
const val JWT_CLAIM_USERNAME = "username"
const val JWT_CLAIM_GENDER = "gender"
const val JWT_CLAIM_TEAM = "team"

private const val EXPIRED_OR_INVALID_TOKEN = "Expired or invalid JWT token"

@Service
class JwtTokenProvider(
    @Value("\${app.jwtSecret}")
    private val jwtSecret: String,

    @Value("\${app.jwtExpirationMs}")
    private val jwtExpirationMs: Long
) {

    private val secretKey = Keys.hmacShaKeyFor(jwtSecret.toByteArray(Charsets.UTF_8))
    private val parser = Jwts.parserBuilder().setSigningKey(secretKey).build()

    private fun parseToken(token: String) = parser.parseClaimsJws(token).body

    fun generateToken(user: User): String {

        return Jwts.builder()
            .setSubject(user.username)
            .claim("role", user.role)
            .setIssuedAt(Date())
            .setExpiration(Date(System.currentTimeMillis() + jwtExpirationMs))
            .signWith(secretKey)
            .compact()
    }

    fun getAuthentication(token: String): Authentication {
        val parsed = parseToken(token)
        val role =  parsed[JWT_CLAIM_ROLE]?.toString() ?: "guest"
        return UsernamePasswordAuthenticationToken(
            MyUserDetails(
                id = parsed[JWT_CLAIM_ID]?.toString()?.toLong() ?: 0,
                role = role,
                username = parsed[JWT_CLAIM_USERNAME]?.toString() ?: "unnamed",
                gender = parsed[JWT_CLAIM_GENDER]?.toString() ?: "",
                team =parsed[JWT_CLAIM_TEAM]?.toString() ?: "",
                email =parsed[JWT_CLAIM_EMAIL]?.toString() ?: ""
            ),"",
            listOf(SimpleGrantedAuthority("ROLE_${role}"))
        )
    }

    fun resolveToken(req: HttpServletRequest): String? {
        val bearerToken = req.getHeader("Authorization")
        return if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            bearerToken.substring(7, bearerToken.length)
        } else {
            null
        }
    }

    fun validateToken(token: String): Boolean {
        return try {
            val claims: Jws<Claims> = parser.parseClaimsJws(token)
            !claims.body.expiration.before(Date())
        } catch (e: JwtException) {
            throw JwtException(EXPIRED_OR_INVALID_TOKEN)
        } catch (e: IllegalArgumentException) {
            throw IllegalArgumentException(EXPIRED_OR_INVALID_TOKEN)
        } catch (e: SecurityException) {
            throw SecurityException(EXPIRED_OR_INVALID_TOKEN)
        }
    }
}

fun Authentication?.getUserOrNull(): MyUserDetails? {
    return if (this == null) null else (this.principal as MyUserDetails?)
}
