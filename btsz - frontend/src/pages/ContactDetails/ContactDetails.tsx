import React from "react";
import styles from "./ContactDetails.module.scss";
import LL from "../../translations";
import btszLogo from "../../assets/logos/BTSZBottom.png";

const ContactDetails = () => {
  return (
    <div className={styles.container}>
      <div className={styles.subtitle}>{LL.contactDetails.connection}</div>
      <div>
        <p>
          <strong>{LL.bptsz}</strong>
          <strong>{LL.contactDetails.adress}</strong>
        </p>
        <p>
          {LL.contactDetails.bank}
          <br />
          {LL.contactDetails.tax}
        </p>
        <p>
          {LL.contactDetails.presidentTel}
          <br />
          {LL.contactDetails.secretaryGeneralTel}
          <br />
          {LL.contactDetails.email}
          <a href="mailto:info@bptekeszov.hu">
            {LL.contactDetails.emailAdress}
          </a>
        </p>
        <p style={{ display: "inline" }}>
          <strong> {LL.contactDetails.customerReception}</strong>
          {LL.contactDetails.customerReceptionData}
        </p>
        <p> {LL.contactDetails.otherInfo}</p>
      </div>
      <div className={styles.logoContainer}>
        <img src={btszLogo} alt="btszLogo" />
      </div>
    </div>
  );
};

export default ContactDetails;
