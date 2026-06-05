import {useCallback, useEffect, useState} from 'react'
import {usePostImageState} from './usePostImageState'
import {getCroppedImg} from '@/entites/posts/createPost/lib/imageUtils'
import {useUploadImagesMutation} from '@/entites/posts/createPost/api/useUploadImagesMutation'
import {useCreatePostMutation} from '@/entites/posts/createPost/api/useCreatePostMutation'
import {useModal} from "@/widgets/modal/model/modal.context";
import {useRouter} from "next/navigation";

export type WizardStep = 'UPLOAD' | 'CROP' | 'FILTERS' | 'DESCRIPTION'


export const usePostWizard = () => {
    const router = useRouter()
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
        const checkImageDimensions = async (blob: Blob, stage: string) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            console.log(`${stage}:`, {
                width: img.width,
                height: img.height,
                aspectRatio: img.width / img.height,
                isSquare: img.width === img.height
            });
            resolve({width: img.width, height: img.height});
        };
        img.src = URL.createObjectURL(blob);
    });
};
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
            const cropArea = img.croppedAreaPixels || null
            const blob = await getCroppedImg(img.url, cropArea, img.filter || 'none')
            
            // Проверяем размеры после применения фильтра
            await checkImageDimensions(blob, `После фильтра (id: ${img.id})`);
            
            return { ...img, croppedBlob: blob };
        })
    );

                finalImages.forEach((img) => updateImage(img.id, img))
                setStep('DESCRIPTION')
            } catch (e) {
                console.error("Filter application error:", e)
            }
        }
    }

    // логика публикации
    const handlePublish = async () => {
    // Логируем размеры перед отправкой
    const filesToUpload = images.map(img => {
        let fileToUpload = img.croppedBlob ? 
            new File([img.croppedBlob], img.file.name, {type: img.file.type}) : 
            img.file;
        
        // Получаем размеры изображения
        const imgElement = new Image();
        imgElement.src = URL.createObjectURL(fileToUpload);
        imgElement.onload = () => {
            console.log('Отправляемое изображение:', {
                name: fileToUpload.name,
                width: imgElement.width,
                height: imgElement.height,
                isSquare: imgElement.width === imgElement.height
            });
            URL.revokeObjectURL(imgElement.src);
        };
        
        return fileToUpload;
    });

        try {
            // 1. Загружаем картинки
            const uploadedImages = await uploadMut.mutateAsync(filesToUpload)
            // 2. Создаем пост
            await createMut.mutateAsync({
                description,
                childrenMetadata: uploadedImages.map(i => ({uploadId: i.uploadId})),
            })
            router.refresh()
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