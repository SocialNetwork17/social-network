'use client'

import Image from 'next/image'
import styles from './Card.module.scss'
import { useState } from 'react'
import Skeleton from '../Skeleton/Skeleton'

type Props = {
  images: string[] | string 
  alt?: string
  slider?: boolean
  variant?: 'rectangle' | 'circular'
  width?: number
  height?: number
  onClick?: () => void
}

export default function Card(props: Props) {
  const { images, alt = 'фото', slider = false, variant = 'rectangle', height, width, onClick } = props

  const [currentIndex, setCurrentIndex] = useState(0)

  // Нормализуем images в массив для единообразной работы
  const imagesArray = Array.isArray(images) ? images : [images]

  if (!images.length) return <Skeleton height={204} width={204} />

  const nextSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex === images.length - 1 ? prevIndex : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? prevIndex : prevIndex - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Определяем, показывать ли слайдер
  const showSlider = slider && imagesArray.length > 1

  return (
    <div className={styles.carouselContainer} style={{ height: height, width: width }}>
      {imagesArray.map((image, index) => (
        <div
          key={index}
          onClick={onClick}
          className={`${styles.slide} ${index === currentIndex ? styles.active : ''}`}
        >
          <Image
            src={image}
            alt={`${alt} - ${index + 1} of ${imagesArray.length}`}
            fill={true}
            className={`${styles.image} ${variant === 'circular' ? styles.rounded : ''}`}
            sizes="(max-width: 768px) 100vw, 600px"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Navigation arrows */}
      {showSlider && (
        <>
          <button
            className={`${styles.arrow} ${styles.arrowLeft}`}
            onClick={prevSlide}
            disabled={currentIndex === 0}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            className={`${styles.arrow} ${styles.arrowRight}`}
            onClick={nextSlide}
            disabled={currentIndex === imagesArray.length - 1}
            aria-label="Next image"
          >
            ›
          </button>
        </>
      )}

      {/* Dots indicator */}
      {showSlider && (
        <div className={styles.dots}>
          {imagesArray.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
