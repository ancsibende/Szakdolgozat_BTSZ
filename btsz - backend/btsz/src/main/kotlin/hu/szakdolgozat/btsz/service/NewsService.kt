package hu.szakdolgozat.btsz.service

import hu.szakdolgozat.btsz.model.News
import hu.szakdolgozat.btsz.repository.NewsRepository
import jakarta.transaction.Transactional
import org.springframework.stereotype.Service

@Transactional
@Service
class NewsService (private val newsRepository: NewsRepository) {

    fun addNews(news: News) {
        newsRepository.save(news)
    }

    fun getAllNews(): List<News> {
        return newsRepository.findAll().toList()
    }

    fun deleteNewsByContentId(contentId: Long) {
        newsRepository.deleteByContentId(contentId)
    }
}

