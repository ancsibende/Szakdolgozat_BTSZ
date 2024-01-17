import React, { useEffect, useRef, useState } from "react";

import styles from "./Carousel.module.scss";
import SliderButton from "../Buttons/SliderButton";

const SLIDER_BUTTON_SIZE = 56;

interface CarouselProps {
  children: React.ReactNode;
  scrollStep: number;
}

const Carousel = ({ children, scrollStep }: CarouselProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [sliderVisible, setSliderVisible] = useState<{
    left: boolean;
    right: boolean;
  }>({ left: true, right: true });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", () => {
        verifySliders();
      });
      verifySliders();
    }

    return () => {
      scrollRef.current?.removeEventListener("scroll", () => {
        verifySliders();
      });
    };
  }, []);

  const verifySliders = () => {
    if (containerRef.current && scrollRef.current) {
      const scrollableLeft = scrollRef.current.scrollLeft;
      const scrollEnd =
        scrollRef.current.scrollWidth - containerRef.current.clientWidth;
      const gap = 15;
      if (scrollableLeft <= gap) {
        setSliderVisible({ left: false, right: true });
      } else if (scrollableLeft > gap && scrollableLeft < scrollEnd - gap) {
        setSliderVisible({ left: true, right: true });
      } else if (scrollableLeft >= scrollEnd - gap) {
        setSliderVisible({ left: true, right: false });
      }
    }
  };

  const slideRight = () => {
    if (containerRef.current && scrollRef.current) {
      const scrollable = scrollRef.current;
      scrollable.scrollBy({ left: scrollStep, behavior: "smooth" });
      verifySliders();
    }
  };

  const slideLeft = () => {
    if (containerRef.current && scrollRef.current) {
      const scrollable = scrollRef.current;
      scrollable.scrollBy({ left: scrollStep * -1, behavior: "smooth" });
      verifySliders();
    }
  };

  return (
    <div className={styles.carouselContainer} ref={containerRef}>
      <div className={styles.pseudoElement} />
      <div className={styles.innerContainer} ref={scrollRef}>
        <div className={styles.carouselSlider}>{children}</div>
      </div>
      {sliderVisible.right && (
        <SliderButton
          direction={"right"}
          onClick={slideRight}
          additionalStyles={{
            width: "32px",
            height: "32px",
            position: "absolute",
            right: `calc(-${SLIDER_BUTTON_SIZE}px / 2)`,
            top: `calc(50% - ${SLIDER_BUTTON_SIZE}px / 2)`,
          }}
        />
      )}
      {sliderVisible.left && (
        <SliderButton
          direction={"left"}
          onClick={slideLeft}
          additionalStyles={{
            width: "32px",
            height: "32px",
            position: "absolute",
            left: `calc(-${SLIDER_BUTTON_SIZE}px / 2)`,
            top: `calc(50% - ${SLIDER_BUTTON_SIZE}px / 2)`,
          }}
        />
      )}
    </div>
  );
};

export default Carousel;
