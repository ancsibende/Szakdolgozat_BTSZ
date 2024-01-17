import React, { useState } from "react";
import styles from "./Regluations.module.scss";
import LL from "../../translations";
import PdfIcon from "../../assets/icons/iconPdf.svg";
import Modal from "../../components/Modal/Modal";

const Regulations = () => {
  const [showModal, setShowModal] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");

  const handlePdfClick = (url: string) => {
    setPdfUrl(url);
    setShowModal(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.subtitle}>{LL.regulations}</div>
      <div style={{ display: "inline-block" }}>
        <div className={styles.pdfContainer}>
          <img
            src={PdfIcon}
            onClick={() =>
              handlePdfClick(
                "https://www.bptekeszov.hu/files/sporttorveny2012pdf.pdf",
              )
            }
            style={{ cursor: "pointer" }}
            alt="PDF Icon"
          />
          <a>{LL.regulationsPage.sportLaw}</a>
        </div>
        <div className={styles.pdfContainer}>
          <img
            src={PdfIcon}
            onClick={() =>
              handlePdfClick(
                "https://www.bptekeszov.hu/files/matesz_muszaki_szabalyzat_2020pdf.pdf",
              )
            }
            style={{ cursor: "pointer" }}
            alt="PDF Icon"
          />
          <a>{LL.regulationsPage.matesz_musz}</a>
        </div>
        <div className={styles.pdfContainer}>
          <img
            src={PdfIcon}
            onClick={() =>
              handlePdfClick(
                "https://www.bptekeszov.hu/files/matesz_versenyszabalyzat_2020pdf.pdf",
              )
            }
            style={{ cursor: "pointer" }}
            alt="PDF Icon"
          />
          <a>{LL.regulationsPage.matesz_vsz}</a>
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

export default Regulations;
