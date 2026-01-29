import {useCallback, useEffect, useState} from 'react'
import {usePostImageState} from './usePostImageState'
import {getCroppedImg} from '@/entites/posts/createPost/lib/imageUtils'
import {useUploadImagesMutation} from '@/entites/posts/createPost/api/useUploadImagesMutation'
import {useCreatePostMutation} from '@/entites/posts/createPost/api/useCreatePostMutation'
import {useModal} from "@/widgets/modal/model/modal.context";

export type WizardStep = 'UPLOAD' | 'CROP' | 'FILTERS' | 'DESCRIPTION'


export const usePostWizard = () => {
    const [step, setStep] = useState<WizardStep>('UPLOAD') // текущий шаг
    const [description, setDescription] = useState('') // текст поста

    const {clearModals} = useModal()

    // Подключаем стейт картинок
    const imageState = usePostImageState()
    const {images, updateImage, resetImages} = imageState

    // Подключаем мутации здесь (в родительском хуке)
    const uploadMut = useUploadImagesMutation()
    const createMut = useCreatePostMutation()

    // Общий статус загрузки
    const isLoading = uploadMut.isPending || createMut.isPending

    // функция закрытия визарда
    const handleClose = useCallback(() => {
        //очищает стейт и ревокирует URL'ы
        resetImages()
        setStep('UPLOAD')
        setDescription('')
        clearModals()
    }, [resetImages, clearModals])

    //вызывается, когда пользователь выбрал файлы: создаёт ImageItem, переключает шаг на кроп
    const handleImagesUpload = (files: File[]) => {
        imageState.addImages(files)
        setStep('CROP')
    }

    const handleNextStep = async () => {
        if (step === 'CROP') {
            try {
                const processedImages = await Promise.all(
                    images.map(async (img) => {
                        if (img.croppedAreaPixels) {
                            const blob = await getCroppedImg(img.url, img.croppedAreaPixels, 'none')
                            const previewUrl = URL.createObjectURL(blob)
                            return {...img, croppedBlob: blob, croppedPreviewUrl: previewUrl, isCropped: true}
                        }
                        return {...img, isCropped: true}
                    })
                )
                // ВАЖНО: Используем img.id для обновления
                processedImages.forEach((updatedImg) => updateImage(updatedImg.id, updatedImg))
                setStep('FILTERS')
            } catch (e) {
                console.error("Crop error:", e)
            }
        } else if (step === 'FILTERS') {
            try {
                const finalImages = await Promise.all(
                    images.map(async (img) => {
                        // УБРАЛИ ПРОВЕРКУ if (img.croppedAreaPixels)
                        // Теперь мы всегда "запекаем" картинку перед финальным шагом,
                        // чтобы применился фильтр.

                        // Если кропа нет, передаем null (функция выше обработает это как "вся картинка")
                        const cropArea = img.croppedAreaPixels || null

                        const blob = await getCroppedImg(img.url, cropArea, img.filter || 'none')
                        const previewUrl = URL.createObjectURL(blob)

                        return {
                            ...img,
                            croppedBlob: blob,
                            croppedPreviewUrl: previewUrl,
                            // Важно сохранить координаты, если они были, или оставить как есть
                            croppedAreaPixels: img.croppedAreaPixels
                        }
                    })
                )

                finalImages.forEach((img) => updateImage(img.id, img))
                setStep('DESCRIPTION')
            } catch (e) {
                console.error("Filter application error:", e)
            }
        }
    }

    // логика публикации
    const handlePublish = async () => {
        // Подготавливаем файлы для отправки
        const filesToUpload = images.map(img => {
            if (img.croppedBlob) {
                // Если был кроп, берем blob и делаем из него File для отправки на сервер
                return new File([img.croppedBlob], img.file.name, {type: img.file.type})
            }
            return img.file // Иначе оригинал
        })

        try {
            // 1. Загружаем картинки
            const uploadedImages = await uploadMut.mutateAsync(filesToUpload)

            // 2. Создаем пост
            await createMut.mutateAsync({
                description,
                childrenMetadata: uploadedImages.map(i => ({uploadId: i.uploadId})),
            })

            // 3. Успех
            handleClose()
        } catch (e) {
            console.error("Publish error", e)
        }
    }

    //функция для кнопки Back — меняет шаг назад.
    const handleBack = () => {
        if (step === 'CROP') {
            setStep('UPLOAD')
        } else if (step === 'FILTERS') {
            setStep('CROP')
        } else if (step === 'DESCRIPTION') {
            setStep('FILTERS')
        }
    }

    useEffect(() => {
        if (images.length === 0 && step !== 'UPLOAD') {
            setStep('UPLOAD')
        }
    }, [images.length, step])


    return {
        step,
        setStep,
        description,
        setDescription,
        isLoading, // Теперь отдаем статус загрузки
        handleNextStep, // Единая точка входа для "Далее"
        handlePublish,  // Единая точка входа для "Опубликовать"
        handleClose,
        handleImagesUpload,
        handleBack,
        // Пробрасываем стейт картинок
        ...imageState
    }
}