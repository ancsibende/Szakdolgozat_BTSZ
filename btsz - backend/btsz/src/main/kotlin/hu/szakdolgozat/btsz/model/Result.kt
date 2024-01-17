package hu.szakdolgozat.btsz.model

import jakarta.persistence.*

@Entity
@Table(name = "results")
data class Result(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(name = "event_id")
    var eventId: Long,

    @Column(nullable = false)
    var homeName: String,

    @Column(nullable = false)
    var hsumpin: Int,

    @Column(nullable = false)
    var hsetpoints: Float,

    @Column(nullable = false)
    var guestName: String,

    @Column(nullable = false)
    var gsumpin: Int,

    @Column(nullable = false)
    var gsetpoints: Float
)

