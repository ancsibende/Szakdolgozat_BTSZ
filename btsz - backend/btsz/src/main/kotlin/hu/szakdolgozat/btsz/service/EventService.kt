package hu.szakdolgozat.btsz.service

import hu.szakdolgozat.btsz.model.Event
import hu.szakdolgozat.btsz.repository.EventRepository
import hu.szakdolgozat.btsz.repository.ResultRepository
import hu.szakdolgozat.btsz.repository.UploadRepository
import jakarta.transaction.Transactional
import org.springframework.dao.DataAccessException
import org.springframework.stereotype.Service

@Transactional
@Service
class EventService(
    private val eventRepository: EventRepository,
    private val resultRepository: ResultRepository
) {

    fun getAllEvents(): List<Event> {
        try {
            return eventRepository.findAll()
        } catch (e: DataAccessException) {
            throw RuntimeException("Error retrieving events from the database", e)
        }
    }

    fun createEvent(event: Event) {
        val newEvent = Event(
            date = event.date,
            time = event.time,
            gender = event.gender,
            place = event.place,
            team1 = event.team1,
            team2 = event.team2,
            turn = event.turn,
            season = event.season,
            protocol = event.protocol
        )
        eventRepository.save(newEvent)
    }

    @Transactional
    fun deleteEvent(eventId: Long) {
        eventRepository.deleteById(eventId)
    }

    @Transactional
    fun deleteResultsByEventId(eventId: Long) {
        resultRepository.deleteByEventId(eventId)
    }

    fun getMatchesByTeam(team: String): List<Event> {
        val allEvents = eventRepository.findAll()
        return allEvents.filter { (it.team1 == team || it.team2 == team) && it.results.isEmpty() }
            .sortedBy { it.date }
    }

    fun getEventById(eventId: Long): Event? {
        return eventRepository.findById(eventId).orElse(null)
    }

    fun findFemaleEventsWithResults(): List<Event> {
        return eventRepository.findFemaleEventsWithResults()
    }

    fun findMaleEventsWithResults(): List<Event> {
        return eventRepository.findMaleEventsWithResults()
    }

     fun findEventsByTeam(team: String): List<Event> {
        return eventRepository.findByTeam1OrTeam2(team)
    }

    fun saveAll(events: Iterable<Event>): Iterable<Event> {
        return eventRepository.saveAll(events)
    }
}
