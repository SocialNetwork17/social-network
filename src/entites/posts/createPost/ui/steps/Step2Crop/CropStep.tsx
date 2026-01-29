import React, {useState} from 'react'
import type {Area} from 'react-easy-crop'
import Cropper from 'react-easy-crop'
import type {ImageItem} from '@/entites/posts/createPost/api/types'
import s from './CropStep.module.scss'
import {ToolButtons} from "@/entites/posts/createPost/ui/steps/Navigate/ToolButtons";
import {AspectRatioPanel} from "@/entites/posts/createPost/ui/steps/Navigate/AspectRatioPanel";
import {ZoomPanel} from '@/entites/posts/createPost/ui/steps/Navigate/ZoomPanel'
import {NavigationArrows} from "@/entites/posts/createPost/ui/steps/Navigate/NavigationArrows";
import {NavigationDots} from "@/entites/posts/createPost/ui/steps/Navigate/NavigationDots";
import {DeleteButton} from "@/entites/posts/createPost/ui/steps/Navigate/DeleteButton";

type Props = {
    images: ImageItem[]
    activeIndex: number
    onUpdate: (id: string, partial: Partial<ImageItem>) => void
    onIndexChange: (index: number) => void
    onDelete: () => void
}

export const CropStep = ({ images, activeIndex, onUpdate, onIndexChange, onDelete}: Props) => {
    const currentImage = images[activeIndex]

    const [showAspectTools, setShowAspectTools] = useState(false)
    const [showZoomTools, setShowZoomTools] = useState(false)

    if (!currentImage) return null


    const handleUpdate = (partial: Partial<ImageItem>) => {
        onUpdate(currentImage.id, partial)
    }

    const onCropComplete = (_: Area, croppedAreaPixels: Area) => {
        handleUpdate({croppedAreaPixels})
    }

    return (
        <div className={s.cropAreaWrapper}>
            <div className={s.cropArea}>
                <Cropper
                    image={currentImage.url}
                    crop={currentImage.crop}
                    zoom={currentImage.zoom}
                    aspect={currentImage.aspect}

                    onCropChange={(location) => handleUpdate({crop: location})}
                    onZoomChange={(zoom) => handleUpdate({zoom})}
                    onCropComplete={onCropComplete}

                    showGrid={true}
                    objectFit="contain"

                    classes={{containerClassName: s.cropperContainer}}
                />

                <DeleteButton onClick={onDelete}/>

                <ToolButtons
                    onAspectButtonClick={() => {
                        setShowAspectTools(!showAspectTools);
                        setShowZoomTools(false)
                    }}
                    onZoomButtonClick={() => {
                        setShowZoomTools(!showZoomTools);
                        setShowAspectTools(false)
                    }}
                />

                {showAspectTools && (
                    <AspectRatioPanel
                        aspect={currentImage.aspect}
                        onAspectChange={(newAspect) => handleUpdate({aspect: newAspect})}
                    />
                )}

                {showZoomTools && (
                    <ZoomPanel
                        zoom={currentImage.zoom}
                        onZoomChange={(zoom) => handleUpdate({zoom})}
                    />
                )}

                <NavigationArrows
                    activeIndex={activeIndex}
                    imagesLength={images.length}
                    onPrev={() => onIndexChange(Math.max(0, activeIndex - 1))}
                    onNext={() => onIndexChange(Math.min(images.length - 1, activeIndex + 1))}
                />

                <NavigationDots
                    images={images}
                    activeIndex={activeIndex}
                    onDotClick={onIndexChange}
                />
            </div>
        </div>
    )
}