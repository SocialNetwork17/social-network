"use client";

import Image from "next/image";
import styles from "./Card.module.css";
import { useState } from "react";

interface Props {
  images: string[];
  alt?: string;
  slider?: boolean;
  variant?: "rectangle" | "circular";
}

export default function Card(props: Props) {
  const { images, alt = "Post", slider=false, variant="rectangle"} = props;

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (!images.length) return null;

  return (
    <div className={styles.carouselContainer}>
      {images.map((image, index) => (
        <div
          key={index}
          className={`${styles.slide} ${
            index === currentIndex ? styles.active : ""
          }`}
        >
          <Image
            src={image}
            alt={`${alt} - ${index + 1} of ${images.length}`}
            fill={true}
            className={`${styles.image} ${
              variant === "circular" ? styles.rounded : ""
            }`}
            sizes="(max-width: 768px) 100vw, 600px"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Navigation arrows */}
      {slider&&images.length > 1 && (
        <>
          <button
            className={`${styles.arrow} ${styles.arrowLeft}`}
            onClick={prevSlide}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            className={`${styles.arrow} ${styles.arrowRight}`}
            onClick={nextSlide}
            aria-label="Next image"
          >
            ›
          </button>
        </>
      )}

      {/* Dots indicator */}
      {slider&&images.length > 1 && (
        <div className={styles.dots}>
          {images.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${
                index === currentIndex ? styles.active : ""
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

