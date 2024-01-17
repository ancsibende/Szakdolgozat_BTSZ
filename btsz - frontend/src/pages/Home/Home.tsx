import React, { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import LL from "../../translations";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import RVSE from "../../assets/alleys/rakoshegy.png";
import FTC from "../../assets/alleys/ftc.png";
import BKV from "../../assets/alleys/bkv.png";
import EROMU from "../../assets/alleys/eromu.png";
import VIZMU from "../../assets/alleys/vizmu.png";
import GAZMU from "../../assets/alleys/gazmu.png";
import LoaderWrapper from "../../components/LoaderWrapper/LoaderWrapper";
import NewsCard from "../../components/NewsCard/NewsCard";
import Carousel from "../../components/Carousel/Carousel";
import { useNavigate } from "react-router-dom";
import { NewsDetails } from "../../types";
import { getNews } from "../../api/news/news.api";

const NEWS_CARD_SIZE = 204;
const GAP = 16;

const Home = () => {
  const [newsBody, setNewsBody] = useState<NewsDetails | string | null>(null);
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [newsDetailsLoading, setNewsDetailsLoading] = useState(false);
  const [news, setNews] = useState<NewsDetails[]>([]);

  const navigate = useNavigate();

  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
  };

  const formatPublishedDate = (date: string) => {
    const originalDate = new Date(date);

    const formattedDate = originalDate.toLocaleString("hu-HU", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    return formattedDate;
  };

  const navigateToNewsDetail = (newsItem: NewsDetails) => {
    navigate(`/hirek/${newsItem.contentId}`, { state: { newsItem } });
  };

  const fetchNews = async () => {
    try {
      const response = await getNews();
      const sortedNews = response.data.sort((a, b) =>
        b.publishedDate.localeCompare(a.publishedDate),
      );
      setNews(sortedNews);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div>
      <div className={styles.imgContainer}>
        <Slider {...settings}>
          <div>
            <img src={RVSE} />
            <p>{LL.alleys.rvse}</p>
          </div>
          <div>
            <img src={FTC} />
            <p>{LL.alleys.ftc}</p>
          </div>
          <div>
            <img src={BKV} />
            <p>{LL.alleys.bkv}</p>
          </div>
          <div>
            <img src={EROMU} />
            <p>{LL.alleys.eromu}</p>
          </div>
          <div>
            <img src={VIZMU} />
            <p>{LL.alleys.vizmu}</p>
          </div>
          <div>
            <img src={GAZMU} />
            <p>{LL.alleys.gazmu}</p>
          </div>
        </Slider>
      </div>
      <div style={{ backgroundColor: "#f4f4f5" }}>
        <LoaderWrapper className={styles.newsContainer}>
          <div className={styles.sectionHeaderContainer}>
            <div className={styles.sectionTitle}>{LL.news}</div>
          </div>

          <Carousel scrollStep={NEWS_CARD_SIZE + GAP}>
            {news.map((n) => (
              <div
                key={n.contentId}
                onClick={() => navigateToNewsDetail(n)}
                style={{ cursor: "pointer" }}
              >
                <NewsCard
                  key={n.contentId}
                  publishedDate={formatPublishedDate(n.publishedDate)}
                  highlightingColorCode={n.highlightingColorCode}
                  isHighlighted={n.isHighlighted}
                  lead={n.leadText}
                  title={n.title}
                  coverUrl={n.coverUrl}
                  onClick={async () => {
                    if (newsDetailsLoading) {
                      return;
                    }
                    setNewsDetailsLoading(true);
                    try {
                      setNewsBody(n);
                    } catch (error) {
                      setNewsBody(null);
                    } finally {
                      setNewsDetailsLoading(false);
                    }
                  }}
                />
              </div>
            ))}
          </Carousel>
        </LoaderWrapper>
      </div>
    </div>
  );
};

export default Home;
