import React, { useMemo } from 'react'
import type { ImageItem } from '@/entites/posts/createPost/api/types'
import { FILTER_PRESETS } from '@/entites/posts/createPost/ui/steps/Step3Filters/filters'
import { NavigationArrows } from "@/entites/posts/createPost/ui/steps/Navigate/NavigationArrows"
import { NavigationDots } from "@/entites/posts/createPost/ui/steps/Navigate/NavigationDots"
import s from './FiltersStep.module.scss'

type Props = {
    images: ImageItem[]
    activeIndex: number
    onUpdate: (id: string, partial: Partial<ImageItem>) => void
    onIndexChange: (index: number) => void
}


export const FiltersStep = ({ images, activeIndex, onUpdate, onIndexChange }: Props) => {
    const currentImage = images[activeIndex]
    if (!currentImage) return null

    const previewUrls = useMemo(
        () => images.map(img => img.croppedPreviewUrl || img.url),
        [images]
    )

    return (
        <div className={s.wrapper}>

            <div className={s.filterAreaWrapper}>
                <div className={s.filterArea}>
                    <img
                        src={previewUrls[activeIndex]}
                        alt="Current preview"
                        style={{
                            filter: currentImage.filter || 'none',
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            display: 'block'
                        }}
                    />

                    {/* Навигационные стрелки как в CropStep */}
                    <NavigationArrows
                        activeIndex={activeIndex}
                        imagesLength={images.length}
                        onPrev={() => onIndexChange(Math.max(0, activeIndex - 1))}
                        onNext={() => onIndexChange(Math.min(images.length - 1, activeIndex + 1))}
                    />

                    {/* Точки навигации как в CropStep */}
                    <NavigationDots
                        images={images}
                        activeIndex={activeIndex}
                        onDotClick={onIndexChange}
                    />
                </div>
            </div>

            <div className={s.filtersArea}>
                <div className={s.filtersGrid}>
                    {FILTER_PRESETS.map(preset => (
                        <button
                            key={preset.id}
                            className={`${s.filterItem} ${currentImage.filter === preset.filter ? s.active : ''}`}
                            onClick={() => onUpdate(currentImage.id, { filter: preset.filter })}
                        >
                            <div className={s.filterPreviewWrapper}>
                                                        <img
                                                            src={previewUrls[activeIndex]}
                                                            alt={preset.label}
                                                            style={{ filter: preset.filter }}
                                                        />
                                                    </div>
                                                    <span>{preset.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}