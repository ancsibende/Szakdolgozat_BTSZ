import React from "react";
import ReactDom from "react-dom";
import { ReactNode } from "react";

import iconClose from "../../assets/icons/iconClose.svg";
import styles from "./Modal.module.scss";

interface ModalProps {
  open: boolean;
  children?: ReactNode | ReactNode[];
  onClose?: () => void;
  onSubmit?: () => void;
  onCancel?: () => void;
  submitText?: string;
  cancelText?: string;
  type?: "small" | "wide" | "pdf" | "img" | "success";
  padding?: string;
}

export default function Modal({
  open,
  children,
  onClose,
  onSubmit,
  onCancel,
  submitText,
  cancelText,
  type = "small",
  padding,
}: ModalProps) {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div onClick={() => onClose && onClose()} className={styles.layer} />
      <div
        className={`${styles.modal} ${
          type === "wide"
            ? styles.wide
            : type === "pdf"
            ? styles.pdf
            : type === "img"
            ? styles.img
            : type === "success"
            ? styles.success
            : ""
        }`}
        style={{ padding: padding ?? "" }}
      >
        {onClose && (
          <div
            onClick={() => onClose && onClose()}
            className={styles.closeIcon}
          >
            <img src={iconClose} />
          </div>
        )}
        {children}
        {onSubmit && onCancel && (
          <div className={styles.buttonContainer}>
            <button
              onClick={() => onSubmit && onSubmit()}
              className={styles.submitButton}
            >
              {submitText}
            </button>
            <button
              onClick={() => onCancel && onCancel()}
              className={styles.cancelButton}
            >
              {cancelText}
            </button>
          </div>
        )}
      </div>
    </>,
    document.getElementById("modal")!,
  );
}
