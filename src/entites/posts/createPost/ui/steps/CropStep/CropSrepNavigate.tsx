import React from 'react'
import type { ImageItem } from '@/entites/posts/createPost/model/types'

type Props = {
    images: ImageItem[]
    activeIndex: number
    setActiveIndex: React.Dispatch<React.SetStateAction<number>>
    setImages: React.Dispatch<React.SetStateAction<ImageItem[]>>
    setStep: React.Dispatch<React.SetStateAction<'UPLOAD' | 'CROP' | 'DESCRIPTION'>>
}


export const CropStepNavigate = ({ images, activeIndex, setActiveIndex, setImages, setStep }: Props) => {
    const handleDelete = () => {
        const toDelete = images[activeIndex]
        if (toDelete) {
            URL.revokeObjectURL(toDelete.url)
            if (toDelete.croppedPreviewUrl) {
                URL.revokeObjectURL(toDelete.croppedPreviewUrl)
            }
        }

        const newImages = images.filter((_, i) => i !== activeIndex)
        setImages(newImages)

        if (newImages.length === 0) {
            setActiveIndex(0)
            setStep('UPLOAD')
        } else if (activeIndex >= newImages.length) {
            setActiveIndex(newImages.length - 1)
        }
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
                <button
                    disabled={activeIndex === 0}
                    onClick={() => setActiveIndex(i => i - 1)}
                >
                    назад
                </button>

                <span>{activeIndex + 1} / {images.length}</span>

                <button
                    disabled={activeIndex === images.length - 1}
                    onClick={() => setActiveIndex(i => i + 1)}
                >
                    вперед
                </button>
            </div>

            <button
                style={{ marginLeft: 12, color: 'red' }}
                onClick={handleDelete}
            >
                Delete
            </button>
        </div>
    )
}
