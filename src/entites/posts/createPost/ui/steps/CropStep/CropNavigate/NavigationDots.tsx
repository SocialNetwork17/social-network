import React from 'react'
import s from '../CropStep.module.scss'
import {ImageItem} from "@/entites/posts/createPost/model/types";

type Props = {
    images: ImageItem[]
    activeIndex: number
    onDotClick: (index: number) => void
}

export const NavigationDots = ({ images, activeIndex, onDotClick }: Props) => {
    return (
        <span className={s.dotsContainer}>
            <span className={s.dotsWrapper}>
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => onDotClick(index)}
                        className={`${s.dotButton} ${index === activeIndex ? s.activeDot : ''}`}
                    />
                ))}
            </span>
        </span>
    )
}