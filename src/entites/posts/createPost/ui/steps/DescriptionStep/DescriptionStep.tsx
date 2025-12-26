
import React, { useCallback, useEffect } from 'react'
import type { ImageItem } from '@/entites/posts/createPost/model/types'
import { useUploadImagesMutation } from '../../../model/useUploadImagesMutation'
import { useCreatePostMutation } from '@/entites/posts/createPost/model/useCreatePostMutation'
import s from './DescriptionStep.module.scss'
import { NavigationArrows } from '@/entites/posts/createPost/ui/steps/CropStep/CropNavigate/NavigationArrows'
import { NavigationDots } from '@/entites/posts/createPost/ui/steps/CropStep/CropNavigate/NavigationDots'

type Props = {
    images: ImageItem[]
    description: string
    setDescription: (s: string) => void
    onClose: () => void
    onPublishRef?: (fn: () => Promise<void>) => void
    activeIndex: number
    setActiveIndex: (index: number) => void
}

export const DescriptionStep = ({
                                    images,
                                    description,
                                    setDescription,
                                    onClose,
                                    onPublishRef,
                                    activeIndex,
                                    setActiveIndex,
                                }: Props) => {
    const uploadMut = useUploadImagesMutation()
    const createMut = useCreatePostMutation()

    //С useCallback функция мемоизируется и не пересоздается при каждом рендере
    const handlePublish = useCallback(async () => {

        if (images.length === 0) return

        const files = images.map(it =>
            it.croppedBlob
                ? new File([it.croppedBlob], it.file.name, { type: 'image/jpeg' })
                : it.file
        )

        try {
            const uploaded = await uploadMut.mutateAsync(files)
            //когда операции идут друг за другом и нужны данные из предыдущей — используем mutateAsync
            // . Если операция одна или независимая — можно обычный mutate.

            await createMut.mutateAsync({
                description,
                childrenMetadata: uploaded.map(i => ({ uploadId: i.uploadId })),
            })

            onClose()
        } catch (error) {
            console.error('Publish failed:', error)
        }
    }, [images, description, uploadMut, createMut, onClose])

    //useEffect для передачи функции публикации родителю
    //Вызывается при изменении handlePublish или onPublishRef
    //Кнопка публикации находится в родителе, а логика публикации (handlePublish) - тут
    useEffect(() => {
        onPublishRef?.(handlePublish)
    }, [handlePublish, onPublishRef])

    const handlePrev = () => {
        if (images.length <= 1) return
        const newIndex = activeIndex > 0 ? activeIndex - 1 : images.length - 1
        setActiveIndex(newIndex)
    }

    const handleNext = () => {
        if (images.length <= 1) return
        const newIndex = activeIndex < images.length - 1 ? activeIndex + 1 : 0
        setActiveIndex(newIndex)
    }

    const handleDotClick = (index: number) => {
        if (index >= 0 && index < images.length) {
            setActiveIndex(index)
        }
    }

    if (images.length === 0) {
        return (
            <div className={s.emptyState}>
                <p>No images to display</p>
            </div>
        )
    }

    const currentImage = images[activeIndex]

    return (
        <div className={s.container}>
            {/* Левая часть - изображение с навигацией */}
            <div className={s.imageSection}>
                <div className={s.imageContainer}>
                    {/*{ currentImage && (*/}
                    {/*    <Card*/}
                    {/*        key={currentImage.id}*/}
                    {/*        images={currentImage.croppedPreviewUrl ?? currentImage.url}*/}
                    {/*        slider={true}*/}
                    {/*    />*/}
                    {/*)*/}

                    {/*}*/}

                    {currentImage && (
                        <img
                            key={currentImage.id}
                            src={currentImage.croppedPreviewUrl ?? currentImage.url}
                            className={s.previewImage}
                            alt="Preview"
                        />
                    )}

                    {/* Стрелки навигации */}
                    {images.length > 1 && (
                        <div className={s.navigationArrowsWrapper}>
                            <NavigationArrows
                                activeIndex={activeIndex}
                                imagesLength={images.length}
                                onPrev={handlePrev}
                                onNext={handleNext}
                            />
                        </div>
                    )}
                </div>

                {/* Точки навигации */}
                {images.length > 1 && (
                    <div className={s.navigationDotsWrapper}>
                        <NavigationDots
                            images={images}
                            activeIndex={activeIndex}
                            onDotClick={handleDotClick}
                        />
                    </div>
                )}
            </div>

            {/* Правая часть - описание */}
            <div className={s.descriptionSection}>
                {/* Профиль пользователя */}
                <div className={s.profileSection}>
                    <div className={s.avatar}>U</div>
                    <div className={s.profileInfo}>
                        <span className={s.username}>URLProfile</span>
                    </div>
                </div>

                {/* Заголовок Publication */}
                <div className={s.publicationHeader}>
                    <p className={s.sectionSubtitle}>Add publication descriptions</p>
                </div>

                {/* Текстареа для описания */}
                <div className={s.textareaContainer}>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Add publication description..."
                        className={s.textarea}
                        rows={8}
                        maxLength={500}
                    />

                </div>
                        <span className={s.charCounter}>
                            {description.length}/500
                        </span>

                {/* Сообщение об ошибке */}
                {(uploadMut.isError || createMut.isError) && (
                    <div className={s.errorMessage}>
                        Failed to publish. Please try again.
                    </div>
                )}
            </div>
        </div>
    )
}