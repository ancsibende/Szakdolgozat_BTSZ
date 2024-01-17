import React, { useState } from "react";
import styles from "./Teams.module.scss";
import LL from "../../translations";
import PdfIcon from "../../assets/icons/iconPdf.svg";
import Modal from "../../components/Modal/Modal";

const Teams = () => {
  const [showModal, setShowModal] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");

  const handlePdfClick = (url: string) => {
    setPdfUrl(url);
    setShowModal(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.subtitle}>{LL.teams}</div>
      <div style={{ display: "inline-block" }}>
        <div className={styles.pdfContainer}>
          <img
            src={PdfIcon}
            onClick={() =>
              handlePdfClick(
                "https://www.bptekeszov.hu/files/szakosztalyok_elerhetosegei_2021pdf.pdf",
              )
            }
            style={{ cursor: "pointer" }}
            alt="PDF Icon"
          />
          <a>{LL.teamsPage.teamsDatas}</a>
        </div>
      </div>
      {showModal && (
        <Modal open={showModal} type="pdf" onClose={() => setShowModal(false)}>
          <iframe
            src={pdfUrl}
            title="PDF Viewer"
            style={{ width: "100%", height: "100%" }}
          />
        </Modal>
      )}
    </div>
  );
};

export default Teams;
