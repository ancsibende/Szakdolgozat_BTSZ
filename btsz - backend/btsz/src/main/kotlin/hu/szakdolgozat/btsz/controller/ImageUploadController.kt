package hu.szakdolgozat.btsz.controller

import hu.szakdolgozat.btsz.repository.UploadRepository
import hu.szakdolgozat.btsz.service.EventService
import hu.szakdolgozat.btsz.service.UploadService
import hu.szakdolgozat.btsz.service.getUserOrNull
import org.springframework.beans.factory.annotation.Value
import org.springframework.core.io.Resource
import org.springframework.core.io.UrlResource
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.io.File
import java.io.IOException
import java.net.MalformedURLException
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths


@RestController
@CrossOrigin(origins = ["\${btsz.frontendUrl:http://127.0.0.1:3000}"], allowedHeaders = ["*"])
@RequestMapping("/api/image")
class ImageUploadController(
    private val uploadService: UploadService,
    private val uploadRepository: UploadRepository,
) {

    @PostMapping("/upload/{eventId}")
    fun uploadImage(
        @PathVariable eventId: Long,
        @RequestParam("file") file: MultipartFile,
        auth: Authentication?
    ): ResponseEntity<*> {
        val user = auth?.getUserOrNull()
        return if (user?.role == "teamLeader") {
            val uploadedPath = uploadService.saveUploadData(file, eventId)
            ResponseEntity.ok(uploadedPath)
        } else {
            ResponseEntity.status(HttpStatus.FORBIDDEN).body("Hozzáférés megtagadva")
        }
    }

    @GetMapping("/{eventId}")
    fun getImage(@PathVariable eventId: Long): ResponseEntity<ByteArray> {
        val upload = uploadRepository.findByEventId(eventId)
        return if (upload != null) {
            val filename = upload.accessPath

            val userUploadsPath = System.getProperty("user.dir") + File.separator

            val filePath = Paths.get(userUploadsPath, filename)
            val file = File(filePath.toUri())

            try {
                val fileBytes = Files.readAllBytes(file.toPath())
                ResponseEntity.ok(fileBytes)
            } catch (e: IOException) {
                ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(byteArrayOf())
            }
        } else {
            ResponseEntity.notFound().build()
        }
    }
}