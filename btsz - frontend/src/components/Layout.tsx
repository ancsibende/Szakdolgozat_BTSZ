import React, { ReactNode } from "react";
import Header from "./Header";
import styles from "./Layout.module.scss";

interface LayoutProps {
  title: string;
  children?: ReactNode;
  blur?: boolean;
  transparent?: boolean;
}

const Layout = ({
  title,
  children,
  blur = true,
  transparent = true,
}: LayoutProps) => {
  return (
    <div className={styles.root} id="layout">
      <Header title={title} />
      <div
        className={`${styles.pageContainer} ${blur ? styles.blur : ""} ${
          transparent ? styles.transparent : ""
        }`}
      >
        <div id="contentContainer" className={styles.contentContainer}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
