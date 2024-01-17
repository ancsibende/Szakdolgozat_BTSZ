import React from "react";
import DOMPurify from "dompurify";
import styles from "./NewsDetails.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import LL from "../../translations";

const NewsDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { newsItem } = location.state;

  const handleGoBack = () => {
    navigate(-1);
  };

  const sanitizedDescriptionHtml = DOMPurify.sanitize(
    newsItem?.descriptionHtml || newsItem,
  );

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.subtitle}>
          {typeof newsItem === "string" ? newsItem : newsItem.title}
        </div>
        <div
          className={styles.newsContainer}
          dangerouslySetInnerHTML={{
            __html: sanitizedDescriptionHtml,
          }}
        />
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleGoBack}>
          {LL.goback}
        </button>
      </div>
    </div>
  );
};

export default NewsDetail;
