package hu.szakdolgozat.btsz.repository

import hu.szakdolgozat.btsz.model.Upload
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.query.Param

interface UploadRepository : CrudRepository<Upload, Long>{
    fun findByEventId(eventId: Long): Upload?
    fun deleteByEventId(eventId: Long)

    @Query("SELECT u.accessPath FROM Upload u WHERE u.eventId = :eventId")
    fun findAccessPathsByEventId(@Param("eventId") eventId: Long): List<String>
}