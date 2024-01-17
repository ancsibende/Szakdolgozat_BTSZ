package hu.szakdolgozat.btsz.model

import jakarta.persistence.Entity
import jakarta.persistence.*

@Entity
@Table(name = "users")
data class User(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(unique = true, nullable = false)
    var username: String,

    @Column(nullable = false)
    var email: String,

    @Column(nullable = false)
    var password: String,

    @Column(nullable = false)
    var role: String,

    @Column(nullable = true)
    var team: String,

    @Enumerated(EnumType.STRING)
    @Column(nullable = true)
    var gender: Gender
)

