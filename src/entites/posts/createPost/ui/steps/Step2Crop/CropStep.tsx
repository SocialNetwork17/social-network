import React, {ChangeEvent, useRef, useState} from 'react'
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
import {ImageThumbnails} from "@/entites/posts/createPost/ui/steps/ImageThumbnails/ImageThumbnails";
import {useModal} from "@/widgets/modal/model/modal.context";
import {uploadErrorModalAC} from "@/widgets/modal/model/modal.types";

const MAX_IMAGES = 10
const ALLOWED_TYPES = ['image/jpeg', 'image/png']

type Props = {
    images: ImageItem[]
    activeIndex: number
    onUpdate: (id: string, partial: Partial<ImageItem>) => void
    onIndexChange: (index: number) => void
    onDelete: () => void
    onAddImages: (files: File[]) => void
}

export const CropStep = ({ images, activeIndex, onUpdate, onIndexChange, onDelete, onAddImages}: Props) => {
    const currentImage = images[activeIndex]

    const [showAspectTools, setShowAspectTools] = useState(false)
    const [showZoomTools, setShowZoomTools] = useState(false)

    const fileInputRef = useRef<HTMLInputElement>(null)
    const {pushModal} = useModal()

    if (!currentImage) return null

    const canAddMore = images.length < MAX_IMAGES

    const handleAddChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return

        const files = Array.from(e.target.files)
        const validFiles = files.filter(f => ALLOWED_TYPES.includes(f.type))

        if (validFiles.length !== files.length) {
            pushModal(uploadErrorModalAC({title: 'Upload error', description: 'Unsupported format. Use JPEG or PNG.'}))
            e.target.value = ''
            return
        }

        const remaining = MAX_IMAGES - images.length
        if (validFiles.length > remaining) {
            pushModal(uploadErrorModalAC({title: 'Upload error', description: `You can add only ${remaining} more image${remaining === 1 ? '' : 's'}.`}))
            e.target.value = ''
            return
        }

        onAddImages(validFiles)
        e.target.value = ''
    }

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
                    onAddClick={() => fileInputRef.current?.click()}
                    canAddMore={canAddMore}
                />

                <input
                    ref={fileInputRef}
                    type="file"
                    accept={ALLOWED_TYPES.join(',')}
                    multiple
                    hidden
                    onChange={handleAddChange}
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



                {/* НОВЫЙ БЛОК: Список превью */}
                <ImageThumbnails
                    images={images}
                    activeIndex={activeIndex}
                    onSelect={onIndexChange}
                    onRemove={(id) => {
                        // Если в хуке removeImage принимает id, используем его
                        // В твоих пропсах CropStep сейчас onDelete без параметров.
                        // Давай прокинем id в onDelete или вызовем напрямую.
                        onDelete(); // Сейчас твой onDelete в пропсах удаляет АКТИВНОЕ фото.
                        // Если хочешь удалять конкретное из списка,
                        // обнови пропсы CropStep: onDelete: (id: string) => void
                    }}
                />




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