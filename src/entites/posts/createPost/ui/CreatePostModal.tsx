'use client'

import React, {useRef, useState} from 'react'
import {UploadStep} from './steps/UploadStep/UploadStep'
import {CropStep} from './steps/CropStep/CropStep'
import {DescriptionStep} from './steps/DescriptionStep/DescriptionStep'
import type {ImageItem} from '../model/types'
import {SuperModal} from "@/shared/ui/SuperModal/SuperModal";
import {Button} from "@/shared/ui/Button/Button";
import {IconButton} from "@/shared/ui/IconButton/IconButton";
import {CropStepNavigate} from "@/entites/posts/createPost/ui/steps/CropStep/CropSrepNavigate";

type Props = {
    isOpen: boolean
    onClose: () => void
}

export const CreatePostModal = ({isOpen, onClose}: Props) => {
    const [step, setStep] = useState<'UPLOAD' | 'CROP' | 'DESCRIPTION'>('UPLOAD')
    const [images, setImages] = useState<ImageItem[]>([])
    const [activeIndex, setActiveIndex] = useState(0)
    const [description, setDescription] = useState('')

    const reset = () => {
        images.forEach(i => {
            URL.revokeObjectURL(i.url)

            if (i.croppedPreviewUrl) {
                URL.revokeObjectURL(i.croppedPreviewUrl)
            }
        })
        setImages([])
        setActiveIndex(0)
        setDescription('')
        setStep('UPLOAD')
    }

    const handleClose = () => {
        if (images.length > 0) {
            const ok = confirm('Do you really want to close the creation of a publication? If you close everything will be deleted')
            if (!ok) return
        }
        reset()
        onClose()
    }

    const applyCropRef = useRef<null | (() => Promise<void>)>(null)


    return (
        <>
            {step === 'UPLOAD' && (
                <SuperModal isOpen={isOpen} onClose={handleClose} title={'Add post'}>
                    <UploadStep
                        images={images}
                        setImages={setImages}
                        onNext={() => setStep('CROP')}
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
                            iconId={'arrow-ios-back'}
                            size={24}
                            onClick={() => setStep('UPLOAD')}/>

                    }
                    headerRight={
                        <Button
                            disabled={images.length === 0}
                            variant={"textButton"}
                            onClickHandler={async () => {
                                if (applyCropRef.current) {
                                    await applyCropRef.current()
                                }
                                setStep('DESCRIPTION')
                            }}>
                            Next
                        </Button>
                    }
                >
                    <div>
                        <CropStep
                            image={images[activeIndex]}
                            onUpdate={(partial) =>
                                setImages(prev =>
                                    prev.map((it, i) =>
                                        i === activeIndex ? {...it, ...partial} : it
                                    )
                                )
                            }
                            onApplyRef={(fn) => {
                                applyCropRef.current = fn
                            }}
                        />

                        <CropStepNavigate
                            images={images}
                            activeIndex={activeIndex}
                            setActiveIndex={setActiveIndex}
                            setImages={setImages}
                            setStep={setStep}
                        />


                    </div>
                </SuperModal>
            )}
            {step === 'DESCRIPTION' && (
                <SuperModal isOpen={isOpen} onClose={handleClose} title={'Publication'}>
                    <DescriptionStep
                        images={images}
                        description={description}
                        setDescription={setDescription}
                        onBack={() => setStep('CROP')}
                        onClose={handleClose}
                    />
                </SuperModal>
            )}
        </>
    )
}