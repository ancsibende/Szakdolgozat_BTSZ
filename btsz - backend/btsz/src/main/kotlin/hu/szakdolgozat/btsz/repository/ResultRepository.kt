package hu.szakdolgozat.btsz.repository

import hu.szakdolgozat.btsz.model.Result
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface ResultRepository : CrudRepository<Result, Long> {
    fun findByEventId(eventId: Long): List<Result>
    fun deleteByEventId(eventId: Long)

}