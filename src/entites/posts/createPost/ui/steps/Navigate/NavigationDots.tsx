import React from 'react'
import s from '@/entites/posts/createPost/ui/steps/Step2Crop/CropStep.module.scss'
import { ImageItem } from "@/entites/posts/createPost/api/types";

type Props = {
    images: ImageItem[]
    activeIndex: number
    onDotClick: (index: number) => void
}

export const NavigationDots = ({ images, activeIndex, onDotClick }: Props) => {
    if (images.length <= 1) return null

    return (
        <div className={s.dots}>
            {images.map((_, index) => (
                <button
                    key={index}
                    className={`${s.dot} ${index === activeIndex ? s.active : ''}`}
                    onClick={() => onDotClick(index)}
                    aria-label={`Go to image ${index + 1}`}
                />
            ))}
        </div>
    )
}