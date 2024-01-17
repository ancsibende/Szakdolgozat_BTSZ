package hu.szakdolgozat.btsz.repository

import hu.szakdolgozat.btsz.model.News
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface NewsRepository : CrudRepository<News, Long> {
    fun deleteByContentId(contentId: Long)
}
