
import React, { useCallback, useEffect, useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'
import type { ImageItem } from '@/entites/posts/createPost/model/types'
import { getCroppedImg } from '../../../lib/imageUtils'
import s from './CropStep.module.scss'
import { DeleteButton } from '@/entites/posts/createPost/ui/steps/CropStep/CropNavigate/DeleteButton'
import { NavigationArrows } from '@/entites/posts/createPost/ui/steps/CropStep/CropNavigate/NavigationArrows'
import { NavigationDots } from '@/entites/posts/createPost/ui/steps/CropStep/CropNavigate/NavigationDots'
import { AspectRatioPanel } from '@/entites/posts/createPost/ui/steps/CropStep/CropNavigate/AspectRatioPanel'
import { ZoomPanel } from '@/entites/posts/createPost/ui/steps/CropStep/CropNavigate/ZoomPanel'
import { ToolButtons } from '@/entites/posts/createPost/ui/steps/CropStep/CropNavigate/ToolButtons'

type Props = {
    image?: ImageItem
    onUpdate: (partial: Partial<ImageItem>) => void
    onApplyRef?: (fn: () => Promise<void>) => void
    images: ImageItem[]
    activeIndex: number
    setActiveIndex: React.Dispatch<React.SetStateAction<number>>
    setImages: React.Dispatch<React.SetStateAction<ImageItem[]>>
    setStep: React.Dispatch<React.SetStateAction<'UPLOAD' | 'CROP' | 'DESCRIPTION'>>
}

export const CropStep = ({
                             image,
                             onUpdate,
                             onApplyRef,
                             images,
                             activeIndex,
                             setActiveIndex,
                             setImages,
                             setStep
                         }: Props) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [aspect, setAspect] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
    const [showAspectTools, setShowAspectTools] = useState(false)
    const [showZoomTools, setShowZoomTools] = useState(false)

    const applyCrop = useCallback(async () => {
        if (!image || !croppedAreaPixels) return

        try {
            const blob = await getCroppedImg(image.url, croppedAreaPixels)
            const previewUrl = URL.createObjectURL(blob)

            onUpdate({
                crop,
                zoom,
                aspect,
                croppedAreaPixels,
                croppedBlob: blob,
                croppedPreviewUrl: previewUrl,
            })
        } catch (err) {
            console.error(err)
            alert('Crop failed')
        }
    }, [image, crop, zoom, aspect, croppedAreaPixels, onUpdate])

    useEffect(() => {
        if (!image) return

        setCrop(image.crop ?? { x: 0, y: 0 })
        setZoom(image.zoom ?? 1)
        setAspect(image.aspect ?? 1)
    }, [image])

    useEffect(() => {
        if (onApplyRef) {
            onApplyRef(applyCrop)
        }
    }, [applyCrop, onApplyRef])

    const onCropComplete = useCallback(
        (_croppedArea: Area, croppedAreaPixels: Area) => {
            setCroppedAreaPixels(croppedAreaPixels)
        },
        []
    )

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

    const handleAspectButtonClick = () => {
        setShowAspectTools(!showAspectTools)
        setShowZoomTools(false)
    }

    const handleZoomButtonClick = () => {
        setShowZoomTools(!showZoomTools)
        setShowAspectTools(false)
    }

    const handlePrev = () => {
        setActiveIndex(i => i - 1)
    }

    const handleNext = () => {
        setActiveIndex(i => i + 1)
    }

    const handleDotClick = (index: number) => {
        setActiveIndex(index)
    }

    if (!image) return null

    return (
        <div className={s.cropAreaWrapper}>
            <div className={s.cropArea}>
                <Cropper
                    image={image.url}
                    crop={crop}
                    zoom={zoom}
                    aspect={aspect}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                />

                <DeleteButton onClick={handleDelete} />

                <ToolButtons
                    onAspectButtonClick={handleAspectButtonClick}
                    onZoomButtonClick={handleZoomButtonClick}
                />

                {showAspectTools && (
                    <AspectRatioPanel
                        aspect={aspect}
                        onAspectChange={setAspect}
                    />
                )}

                {showZoomTools && (
                    <ZoomPanel
                        zoom={zoom}
                        onZoomChange={setZoom}
                    />
                )}

                <NavigationArrows
                    activeIndex={activeIndex}
                    imagesLength={images.length}
                    onPrev={handlePrev}
                    onNext={handleNext}
                />

                <NavigationDots
                    images={images}
                    activeIndex={activeIndex}
                    onDotClick={handleDotClick}
                />
            </div>
        </div>
    )
}