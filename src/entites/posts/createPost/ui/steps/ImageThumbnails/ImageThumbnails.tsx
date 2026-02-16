import React, { useRef } from 'react'
import { ImageItem } from "@/entites/posts/createPost/api/types"
import s from './ImageThumbnails.module.scss'

type ThumbnailsProps = {
    images: ImageItem[]
    activeIndex: number
    onSelect: (index: number) => void
    onRemove: (id: string) => void
}

export const ImageThumbnails = ({ images, activeIndex, onSelect, onRemove }: ThumbnailsProps) => {
    const scrollRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 100 // Шаг прокрутки
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    return (
        <div className={s.wrapper}>
            {/* Стрелочка влево (показываем, если картинок больше 3-4) */}
            {images.length > 3 && (
                <button className={`${s.navBtn} ${s.prev}`} onClick={() => scroll('left')}>
                    {'‹'}
                </button>
            )}

            <div className={s.thumbnailsContainer} ref={scrollRef}>
                {images.map((img, index) => (
                    <div
                        key={img.id}
                        className={`${s.thumbWrapper} ${index === activeIndex ? s.activeThumb : ''}`}
                        onClick={() => onSelect(index)}
                    >
                        <img src={img.url} alt="preview" className={s.thumbImage} />
                        <button
                            className={s.removeThumbBtn}
                            onClick={(e) => {
                                e.stopPropagation()
                                onRemove(img.id)
                            }}
                        >
                            <span>×</span>
                        </button>
                    </div>
                ))}
            </div>

            {/* Стрелочка вправо */}
            {images.length > 3 && (
                <button className={`${s.navBtn} ${s.next}`} onClick={() => scroll('right')}>
                    {'›'}
                </button>
            )}
        </div>
    )
}