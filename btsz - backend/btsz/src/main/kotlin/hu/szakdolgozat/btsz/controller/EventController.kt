package hu.szakdolgozat.btsz.controller

import hu.szakdolgozat.btsz.model.Event
import hu.szakdolgozat.btsz.model.Result
import hu.szakdolgozat.btsz.repository.EventRepository
import hu.szakdolgozat.btsz.repository.ResultRepository
import hu.szakdolgozat.btsz.service.EventService
import hu.szakdolgozat.btsz.service.UploadService
import hu.szakdolgozat.btsz.service.getUserOrNull
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*

@RestController
@CrossOrigin(origins = ["\${btsz.frontendUrl:http://127.0.0.1:3000}"], allowedHeaders = ["*"])
@RequestMapping("/api")
class EventController(
    private val eventService: EventService,
    private val uploadService: UploadService,
    private val resultRepository: ResultRepository
) {

    val ADMIN_ROLE = "admin"
    val TEAM_LEADER_ROLE = "teamLeader"
    @GetMapping("/events")
    fun getAllEvents(): List<Event> {
        return eventService.getAllEvents()
    }

    @PostMapping("/addevent")
    fun createEvent(@RequestBody eventDTO: Event, auth: Authentication?): ResponseEntity<*> {
        val user = auth?.getUserOrNull()
        return if (user?.role == ADMIN_ROLE) {
            eventService.createEvent(eventDTO)
            ResponseEntity.ok("Sikeres eseményfelvétel!")
        } else {
            ResponseEntity.status(HttpStatus.FORBIDDEN).body("Hozzáférés megtagadva")
        }
    }

    @DeleteMapping("/event/{eventId}")
    fun deleteEvent(@PathVariable eventId: Long, auth: Authentication?): ResponseEntity<*> {
        val user = auth?.getUserOrNull()
        return if (user?.role == ADMIN_ROLE) {
            eventService.deleteResultsByEventId(eventId)
            uploadService.deleteUploadsByEventId(eventId)
            eventService.deleteEvent(eventId)
            ResponseEntity.ok("Sikeresen törölte az eseményt!")
        } else {
            ResponseEntity.status(HttpStatus.FORBIDDEN).body("Hozzáférés megtagadva")
        }
    }

    @PostMapping("/events/{teamName}")
    fun getEventsByTeam(@PathVariable("teamName") teamName: String, auth: Authentication?): ResponseEntity<*> {
        val user = auth?.getUserOrNull()
        return if (user?.role == TEAM_LEADER_ROLE) {
            val events = eventService.getMatchesByTeam(teamName)
            ResponseEntity.ok(events)
        } else {
            ResponseEntity.status(HttpStatus.FORBIDDEN).body("Hozzáférés megtagadva")
        }
    }

    @PostMapping("/event/{eventId}/addresults")
    fun addResultsToEvent(
        @PathVariable eventId: Long,
        @RequestBody resultDTOList: List<Result>,
        auth: Authentication?
    ): ResponseEntity<*> {
        val user = auth?.getUserOrNull()
        return if (user?.role == TEAM_LEADER_ROLE) {
            val event = eventService.getEventById(eventId)
            if (event != null) {
                if (resultDTOList.size == 4) {
                    val results = resultDTOList.map {
                        Result(
                            eventId = event.id,
                            homeName = it.homeName,
                            hsumpin = it.hsumpin,
                            hsetpoints = it.hsetpoints,
                            guestName = it.guestName,
                            gsumpin = it.gsumpin,
                            gsetpoints = it.gsetpoints
                        )
                    }
                    resultRepository.saveAll(results)
                    return ResponseEntity.ok("Sikeres eredményfeltöltés!")
                } else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Hiányzó vagy érvénytelen adatok!")
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ilyen id-val nem létezik esemény!")
            }
        } else {
            ResponseEntity.status(HttpStatus.FORBIDDEN).body("Hozzáférés megtagadva")
        }
    }

    @PutMapping("/event/{eventId}/editresults")
    fun editResultsOfEvent(
        @PathVariable eventId: Long,
        @RequestBody resultDTOList: List<Result>,
        auth: Authentication?
    ): ResponseEntity<String> {
        val user = auth?.getUserOrNull()
        return if (user?.role == ADMIN_ROLE) {
            val event = eventService.getEventById(eventId)
            if (event != null) {
                if (resultDTOList.size == 4) {
                    val existingResults = resultRepository.findByEventId(eventId)
                    return if (existingResults.size == 4) {
                        existingResults.forEachIndexed { index, existingResult ->
                            val newResult = resultDTOList[index]
                            existingResult.homeName = newResult.homeName
                            existingResult.hsumpin = newResult.hsumpin
                            existingResult.hsetpoints = newResult.hsetpoints
                            existingResult.guestName = newResult.guestName
                            existingResult.gsumpin = newResult.gsumpin
                            existingResult.gsetpoints = newResult.gsetpoints
                        }
                        resultRepository.saveAll(existingResults)
                        ResponseEntity.ok("Sikeres eredmény módosítás!")
                    } else {
                        ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Hiányzó vagy érvénytelen adatok!")
                    }
                } else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Nem megfelelő eredmények száma!")
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ilyen id-val nem létezik esemény!")
            }
        } else {
            ResponseEntity.status(HttpStatus.FORBIDDEN).body("Hozzáférés megtagadva")
        }
    }

    @GetMapping("/events/withresults/male")
    fun getMaleEventsWithResults(): ResponseEntity<List<Event>> {
        val maleEventsWithResults = eventService.findMaleEventsWithResults()
        return ResponseEntity.ok(maleEventsWithResults)
    }

    @GetMapping("/events/withresults/female")
    fun getFemaleEventsWithResults(): ResponseEntity<List<Event>> {
        val femaleEventsWithResults = eventService.findFemaleEventsWithResults()
        return ResponseEntity.ok(femaleEventsWithResults)
    }


}
