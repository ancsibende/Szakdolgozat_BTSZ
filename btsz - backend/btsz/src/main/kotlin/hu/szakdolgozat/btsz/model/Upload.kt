package hu.szakdolgozat.btsz.model

import jakarta.persistence.*

@Entity
@Table(name = "uploads")
data class Upload(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(name = "access_path")
    val accessPath: String,

    @Column(nullable = false, name = "event_id")
    var eventId: Long
)

