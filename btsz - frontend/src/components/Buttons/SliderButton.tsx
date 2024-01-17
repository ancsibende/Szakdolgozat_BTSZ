import React from "react";
import Arrow from "../../assets/icons/iconArrow.svg";

import styles from "./Button.module.scss";

interface SliderButtonProps {
  direction: "up" | "down" | "right" | "left";
  onClick: () => void;
  additionalStyles?: Record<string, unknown>;
}

const SliderButton = ({
  direction,
  onClick,
  additionalStyles,
}: SliderButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.slider} ${styles[direction]}`}
      style={additionalStyles}
    >
      <img src={Arrow} />
    </button>
  );
};

export default SliderButton;
