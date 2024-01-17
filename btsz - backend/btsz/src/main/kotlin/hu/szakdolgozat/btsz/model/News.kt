package hu.szakdolgozat.btsz.model

import com.fasterxml.jackson.annotation.JsonFormat
import jakarta.persistence.*
import java.time.LocalDateTime
import java.util.Date

@Entity
@Table(name = "news")
data class News(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "content_id")
    val contentId: Long,

    @Column(name = "description_html", nullable = false)
    val descriptionHtml: String = "",

    @Column(name = "title", nullable = false)
    val title: String = "",

    @Column(name = "published_date", nullable = true)
    val publishedDate: Date,

    @Column(name = "cover_url", nullable = false)
    val coverUrl: String = "",

    @Column(name = "lead_text", nullable = false)
    val leadText: String = "",

    @Column(name = "is_highlighted", nullable = false)
    val isHighlighted: Boolean = false,

    @Column(name = "highlighting_color_code", nullable = false)
    val highlightingColorCode: String = ""
)

