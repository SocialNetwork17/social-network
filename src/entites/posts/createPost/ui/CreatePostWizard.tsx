import React, {useEffect} from 'react'
import {UploadStep} from '@/entites/posts/createPost/ui/steps/Step1Upload/UploadStep'
import {CropStep} from '@/entites/posts/createPost/ui/steps/Step2Crop/CropStep'
import {DescriptionStep} from '@/entites/posts/createPost/ui/steps/Step4Description/DescriptionStep'
import {CreatePostModal} from '@/entites/posts/createPost/ui/CreatePostModals/CreatePostModal'
import {Button} from '@/shared/ui/Button/Button'
import {usePostWizard, WizardStep} from "@/entites/posts/createPost/lib/usePostWizard"
import {IconButton} from "@/shared/ui/IconButton/IconButton";
import {FiltersStep} from '@/entites/posts/createPost/ui/steps/Step3Filters/FiltersStep'
import {useModal} from "@/widgets/modal/model/modal.context";

type Props = {
    setStep: (step: WizardStep) => void
}


export const CreatePostWizard = ({setStep}: Props) => {
    const {
        step,
        handleClose,

        // Методы навигации
        handleNextStep,
        handlePublish,
        handleBack,
        isLoading,

        // Image State
        images,
        activeIndex,
        setActiveIndex,
        handleImagesUpload,
        updateImage,
        removeImage,

        // Description
        description,
        setDescription,
    } = usePostWizard()

    // Кнопка крестика
    const handleCloseClick = () => {
        handleClose()
    }

    // Собираем шапку в зависимости от шага
    const getHeaderProps = () => {
        switch (step) {
            case 'UPLOAD':
                return {title: 'Create Post'}

            case 'CROP':
                return {
                    title: 'Cropping',
                    left: (
                        <IconButton iconId={'arrow-left'}
                                    onClick={handleBack}/>
                    ),
                    right: (
                        <Button
                            variant="textButton"
                            onClick={handleNextStep}
                            disabled={false}
                        >
                            Next
                        </Button>
                    )
                }

            case 'FILTERS':
                return {
                    title: 'Filters',
                    left: (
                        <IconButton iconId={'arrow-left'}
                                    onClick={handleBack}/>
                    ),
                    right: (<Button
                            variant="textButton"
                            onClick={handleNextStep}
                            disabled={false}
                        >
                            Next
                        </Button>
                    )
                }

            case 'DESCRIPTION':
                return {
                    title: 'Publication',
                    left: (
                        <IconButton iconId={'arrow-left'}
                                    onClick={handleBack}/>
                    ),
                    right: (
                        <Button
                            variant="textButton"
                            onClick={handlePublish}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Publishing...' : 'Publish'}
                        </Button>
                    )
                }
        }
    }

    const {title, left, right} = getHeaderProps()

    const renderStepContent = () => {
        switch (step) {
            case 'UPLOAD':
                return <UploadStep onUpload={handleImagesUpload} remainingSlots={10}/>
            case 'CROP':
                return (
                    <CropStep
                        images={images}
                        activeIndex={activeIndex}
                        onIndexChange={setActiveIndex}
                        onUpdate={updateImage}
                        onDelete={() => {
                            const imageToDelete = images[activeIndex]
                            if (imageToDelete) removeImage(imageToDelete.id)
                        }}
                    />
                )

            case 'FILTERS':
                return (
                    <FiltersStep
                                 images={images}
                                 activeIndex={activeIndex}
                                 onUpdate={updateImage}
                                 onIndexChange={setActiveIndex}
                    />
                )

            case 'DESCRIPTION':
                return (
                    <DescriptionStep
                                     images={images}
                                     description={description}
                                     setDescription={setDescription}
                    />
                )
        }
    }

    useEffect(() => {
        setStep(step)
    }, [step])

    return (
        <>
            <CreatePostModal
                onClose={handleCloseClick}
                title={title}
                headerLeft={left}
                headerRight={right}
            >
                {renderStepContent()}
            </CreatePostModal>
        </>
    )
}
