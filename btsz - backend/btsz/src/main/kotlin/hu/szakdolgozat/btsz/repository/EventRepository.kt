package hu.szakdolgozat.btsz.repository

import hu.szakdolgozat.btsz.model.Event
import jakarta.transaction.Transactional
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface EventRepository : CrudRepository<Event, Long> {
    override fun findAll(): List<Event>

    @Query("SELECT e FROM Event e WHERE e.gender = 'Female' AND SIZE(e.results) > 0")
    fun findFemaleEventsWithResults(): List<Event>

    @Query("SELECT e FROM Event e WHERE e.gender = 'Male' AND SIZE(e.results) > 0")
    fun findMaleEventsWithResults(): List<Event>

    @Query("SELECT e FROM Event e WHERE e.team1 = :team OR e.team2 = :team")
    fun findByTeam1OrTeam2( team: String): List<Event>
}
