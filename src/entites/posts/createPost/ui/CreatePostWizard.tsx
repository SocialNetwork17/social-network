
import React, { useEffect, useRef, useState } from 'react'
import { UploadStep } from './steps/UploadStep/UploadStep'
import { CropStep } from './steps/CropStep/CropStep'
import { DescriptionStep } from './steps/DescriptionStep/DescriptionStep'
import type { ImageItem } from '../model/types'
import { SuperModal } from '@/entites/posts/SuperModal/SuperModal'
import { Button } from '@/shared/ui/Button/Button'
import { IconButton } from '@/shared/ui/IconButton/IconButton'

type Props = {
    isOpen: boolean
    onClose: () => void
}

export const CreatePostWizard = ({ isOpen, onClose }: Props) => {
    const [step, setStep] = useState<'UPLOAD' | 'CROP' | 'DESCRIPTION'>('UPLOAD')
    const [images, setImages] = useState<ImageItem[]>([])
    const [activeIndex, setActiveIndex] = useState(0)
    const [description, setDescription] = useState('')
    const [canPublish, setCanPublish] = useState(false)

    const applyCropRef = useRef<null | (() => Promise<void>)>(null)
    const publishRef = useRef<null | (() => Promise<void>)>(null)

    const reset = () => {
        images.forEach(i => {
            URL.revokeObjectURL(i.url)
            i.croppedPreviewUrl && URL.revokeObjectURL(i.croppedPreviewUrl)
        })

        setImages([])
        setActiveIndex(0)
        setDescription('')
        setStep('UPLOAD')
        setCanPublish(false)
        publishRef.current = null
    }

    const handleClose = () => {
        if (images.length > 0) {
            const ok = confirm(
                'Do you really want to close the creation of a publication?'
            )
            if (!ok) return
        }
        reset()
        onClose()
    }

    // корректировка индекса активного изображения, чтобы предотвратить ситуацию,
    // когда activeIndex указывает на несуществующее изображение
    useEffect(() => {
        if (step === 'CROP' &&
            images.length > 0 &&
            activeIndex >= images.length) {
            setActiveIndex(images.length - 1)
        }
    }, [step, images, activeIndex])

    return (
        <>
            {step === 'UPLOAD' && (
                <SuperModal isOpen={isOpen} onClose={handleClose} title="Add photo">
                    <UploadStep
                        images={images}
                        setImages={setImages}
                        onNext={() => {
                            setStep('CROP')
                            setActiveIndex(0) // Сбрасываем на первое изображение
                        }}
                    />
                </SuperModal>
            )}

            {step === 'CROP' && images.length > 0 && (
                <SuperModal
                    isOpen={isOpen}
                    onClose={handleClose}
                    title="Crop"
                    headerLeft={
                        <IconButton
                            iconId="arrow-ios-back"
                            size={24}
                            onClick={() => setStep('UPLOAD')}
                        />
                    }
                    headerRight={
                        <Button
                            disabled={false}
                            variant="textButton"
                            onClickHandler={async () => {
                                await applyCropRef.current?.()
                                setStep('DESCRIPTION')
                                setActiveIndex(0) // Сбрасываем на первое изображение
                            }}
                        >
                            Next
                        </Button>
                    }
                >
                    <CropStep
                        image={images[activeIndex]}
                        onUpdate={partial => // partial = те самые данные от ребенка
                            setImages(prev => // prev = текущий массив images
                                prev.map((it, i) =>// если это текущее фото
                                    i === activeIndex ? { ...it, ...partial } // СЛИВАЕМ старое фото + новые данные
                                        : it
                                )
                            )
                        }
                        onApplyRef={fn => (applyCropRef.current = fn)}
                        images={images}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                        setImages={setImages}
                        setStep={setStep}
                    />
                </SuperModal>
            )}

            {step === 'DESCRIPTION' && images.length > 0 && (
                <SuperModal
                    isOpen={isOpen}
                    onClose={handleClose}
                    title="Publication"
                    headerLeft={
                        <IconButton
                            iconId="arrow-ios-back"
                            size={24}
                            onClick={() => setStep('CROP')}
                        />
                    }
                    headerRight={
                        <Button
                            variant="textButton"
                            disabled={!canPublish}
                            onClickHandler={() => publishRef.current?.()}
                        >
                            Publish
                        </Button>
                    }
                >
                    <DescriptionStep
                        images={images}
                        description={description}
                        setDescription={setDescription}
                        onClose={handleClose}
                        onPublishRef={fn => {
                            publishRef.current = fn
                            setCanPublish(true)
                        }}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                    />
                </SuperModal>
            )}
        </>
    )
}