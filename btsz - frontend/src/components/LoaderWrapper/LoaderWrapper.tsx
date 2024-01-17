import React, { ReactNode } from "react";

import styles from "./LoaderWrapper.module.scss";
import IconAlert from "../../assets/icons/iconAbout.svg";
//ICON HERE!!!!!!

interface LoaderWrapperProps {
  children: ReactNode | ReactNode[];
  className?: string;
  loading?: boolean;
  error?: string | null;
}

const LoaderWrapper = ({
  children,
  className,
  loading,
  error,
}: LoaderWrapperProps) => {
  return (
    <div
      className={`${styles.loaderWrapper} ${
        loading ? styles.loading : error ? styles.error : ""
      } ${className || ""}`}
    >
      {!loading && error && (
        <div>
          <IconAlert />
          <span>{error}</span>
        </div>
      )}
      {!loading && !error && children}
    </div>
  );
};

export default LoaderWrapper;
