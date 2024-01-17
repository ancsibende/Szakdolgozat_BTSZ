package hu.szakdolgozat.btsz.repository

import hu.szakdolgozat.btsz.model.MyUserDetails
import hu.szakdolgozat.btsz.model.User
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository : CrudRepository<User, Long> {
    fun findByUsername(username: String): User?
    fun deleteByUsername(username: String)

}
