import React from 'react'
import s from '@/entites/posts/createPost/ui/steps/Step2Crop/CropStep.module.scss'

type Props = {
    activeIndex: number
    imagesLength: number
    onPrev: () => void
    onNext: () => void
}

export const NavigationArrows = ({
                                     activeIndex,
                                     imagesLength,
                                     onPrev,
                                     onNext
                                 }: Props) => {

    if (imagesLength <= 1) return null

    return (
        <>
            <button
                className={`${s.arrow} ${s.arrowLeft}`}
                onClick={onPrev}
                disabled={activeIndex === 0}
                aria-label="Previous image"
            >
                ‹
            </button>
            <button
                className={`${s.arrow} ${s.arrowRight}`}
                onClick={onNext}
                disabled={activeIndex === imagesLength - 1}
                aria-label="Next image"
            >
                ›
            </button>
        </>
    )
}