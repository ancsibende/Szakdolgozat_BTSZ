package hu.szakdolgozat.btsz.config

import org.springframework.stereotype.Service
import java.security.MessageDigest

@Service
class PasswordHasher {
    fun hashPassword(password: String): String {
        val bytes = password.toByteArray()
        val md = MessageDigest.getInstance("SHA-256")
        val digest = md.digest(bytes)
        return digest.joinToString("") { "%02x".format(it) }
    }
}
