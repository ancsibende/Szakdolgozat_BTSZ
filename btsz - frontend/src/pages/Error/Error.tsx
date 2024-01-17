import React from "react";
import LL from "../../translations";
import styles from "./Error.module.scss";

const Error = () => {
  return (
    <div className={styles.container}>
      <h1>{LL.access_denied}</h1>
      <p>{LL.deniedMsg}</p>
    </div>
  );
};

export default Error;
