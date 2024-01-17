package hu.szakdolgozat.btsz.service

import hu.szakdolgozat.btsz.model.Upload
import hu.szakdolgozat.btsz.repository.EventRepository
import hu.szakdolgozat.btsz.repository.UploadRepository
import jakarta.transaction.Transactional
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.io.File
import java.io.FileOutputStream
import java.io.IOException
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths
import java.util.*

@Transactional
@Service
class UploadService(
    private val uploadRepository: UploadRepository,
    private val eventRepository: EventRepository
) {

    fun saveUploadData(file: MultipartFile, eventId: Long): String {
        var filename: String? = null
        try {
            val event = eventRepository.findById(eventId).orElseThrow {
                IllegalArgumentException("Nem található esemény: $eventId")
            }

            val uploadDirectory = "btsz/src/main/resources/uploads/"

            val directory = File(uploadDirectory)
            if (!directory.exists()) {
                directory.mkdirs()
            }

            filename = "${UUID.randomUUID()}_${file.originalFilename}"

            val filePath = Paths.get(uploadDirectory, filename).toString()

            FileOutputStream(filePath).use { stream ->
                stream.write(file.bytes)
            }

            val upload = Upload(accessPath = filePath, eventId = event.id ?: 0L)
            uploadRepository.save(upload)

            return "/$filePath"
        } catch (e: IOException) {
            throw IllegalArgumentException("Feltöltés sikertelen: $filename", e)
        }
    }

    fun deleteUploadsByEventId(eventId: Long) {
        val uploadPaths: List<String> = uploadRepository.findAccessPathsByEventId(eventId)
        uploadRepository.deleteByEventId(eventId)

        val uploadsFolderPath: Path = Paths.get(uploadPaths.toString().removeSurrounding("[","]"))

            try {
                Files.delete(uploadsFolderPath)
            } catch (e: Exception) {
                e.printStackTrace()
            }

    }
}
