import React from "react";
import LL from "../../translations";

import styles from "./NewsCard.module.scss";

interface NewsCardProps {
  title: string;
  isHighlighted?: boolean;
  lead: string;
  coverUrl: string;
  highlightingColorCode?: string;
  publishedDate: string;
  onClick: () => void;
}

const NewsCard = ({
  title,
  isHighlighted,
  highlightingColorCode,
  publishedDate,
  coverUrl,
  lead,
  onClick,
}: NewsCardProps) => {
  const formattedDate = formatPublishedDate(publishedDate);

  return (
    <div onClick={onClick} className={styles.newsCard}>
      <div
        className={styles.coverImage}
        style={{ backgroundImage: `url("${coverUrl}")` }}
      >
        {isHighlighted && (
          <div
            className={styles.highlightRibbon}
            style={{ backgroundColor: highlightingColorCode || "#005972" }}
          >
            KiEmElt
          </div>
        )}
      </div>
      <div style={{ marginRight: "1rem", marginLeft: "1rem" }}>
        <div className={styles.title} title={title}>
          {title}
        </div>
        <p className={styles.lead}>{lead}</p>
      </div>
      <div className={styles.bottomRow}>
        <div className={styles.date}>{formattedDate}</div>
      </div>
    </div>
  );
};

const formatPublishedDate = (publishedDate: string): string => {
  const date = new Date(publishedDate.replace(/-/g, "/"));
  if (!isNaN(date.getTime())) {
    return date.toLocaleDateString("hu-HU", {
      month: "short",
      day: "numeric",
    });
  } else {
    return "Érvénytelen dátum";
  }
};

export default NewsCard;
