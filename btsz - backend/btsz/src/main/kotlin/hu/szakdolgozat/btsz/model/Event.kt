package hu.szakdolgozat.btsz.model

import jakarta.persistence.*


@Entity
@Table(name = "events")
data class Event(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(nullable = false)
    val date: String,

    @Column(nullable = false)
    val time: String,

    @Enumerated(EnumType.STRING)
    @Column(nullable = true)
    val gender: Gender?,

    @Column(nullable = false)
    val place: String,

    @Column(name = "team1", nullable = false)
    var team1: String,

    @Column(name = "team2", nullable = false)
    var team2:String,

    @Column(nullable = false)
    val turn: Int,

    @Column(nullable = false)
    val season: String,

    @Column(nullable = true)
    val protocol: String = "",

    @OneToMany( cascade = [CascadeType.ALL], orphanRemoval = true)
    @JoinColumn(name = "event_id")
    var results: Set<Result> = HashSet()

)
