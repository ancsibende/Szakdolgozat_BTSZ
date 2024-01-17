package hu.szakdolgozat.btsz.model

/*import hu.szakdolgozat.btsz.repository.UserRepository
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import java.io.Serializable*/

/*import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

data class MyUserDetails(
    val user: User
) : UserDetails {

    override fun getAuthorities(): Collection<GrantedAuthority> {
        return listOf(SimpleGrantedAuthority("ROLE_$user.role"))
    }

    override fun getPassword(): String {
        return user.password
    }

    override fun getUsername(): String {
        return user.username
    }

    override fun isAccountNonExpired(): Boolean {
        return true
    }

    override fun isAccountNonLocked(): Boolean {
        return true
    }

    override fun isCredentialsNonExpired(): Boolean {
        return true
    }

    override fun isEnabled(): Boolean {
        return true
    }
}*/

data class MyUserDetails(
    val id: Long,
    val username: String,
    val email: String,
    val role: String,
    val team: String?,
    val gender: String?
   // private val userRepository: UserRepository
) /*: UserDetailsService{
    override fun loadUserByUsername(username: String?): UserDetails? {
        if (username.isNullOrBlank()) {
            throw UsernameNotFoundException("Username must not be null or empty")
        }

        val user = userRepository.findByUsername(username)
            ?: throw UsernameNotFoundException("User with username $username not found")

        return MyUserDetails(
            id = user.id!!,
            username = user.username,
            email = user.email,
            role = user.role,
            team = user.team,
            gender = user.gender?.toString() ?: ""
        )
    }

}
*/