package hu.szakdolgozat.btsz.controller

import hu.szakdolgozat.btsz.model.News
import hu.szakdolgozat.btsz.service.NewsService
import hu.szakdolgozat.btsz.service.getUserOrNull
import jakarta.persistence.EntityNotFoundException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*

@RestController
@CrossOrigin(origins = arrayOf("http://localhost:3000"), allowedHeaders = ["*"])
@RequestMapping("/api")
class NewsController {

    @Autowired
    lateinit var newsService: NewsService

    @PostMapping("/news/add")
    fun addNews(@RequestBody news: News, auth: Authentication?): ResponseEntity<String> {
        val user = auth?.getUserOrNull()
        return if (user?.role == "admin") {
            try {
                newsService.addNews(news)
                ResponseEntity.ok("Sikeres hír feltöltés!")
            } catch (e: Exception) {
                ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Hiba a hír feltöltése során: ${e.message}")
            }
        } else {
            ResponseEntity.status(HttpStatus.FORBIDDEN).body("Hozzáférés megtagadva")
        }
    }

    @GetMapping("/news")
    fun getAllNews(): List<News> {
        return newsService.getAllNews()
    }

    @DeleteMapping("/news/{contentId}")
    fun deleteNews(@PathVariable contentId: Long, auth: Authentication?): ResponseEntity<String> {
        val user = auth?.getUserOrNull()
        return if (user?.role == "admin") {
            try {
                newsService.deleteNewsByContentId(contentId)
                ResponseEntity.ok("Sikeres hír törlés!")
            } catch (e: EntityNotFoundException) {
                ResponseEntity.status(HttpStatus.NOT_FOUND).body("A megadott hír nem található.")
            } catch (e: Exception) {
                ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Hiba a hír törlése során: ${e.message}")
            }
        } else {
            ResponseEntity.status(HttpStatus.FORBIDDEN).body("Hozzáférés megtagadva")
        }
    }

}
