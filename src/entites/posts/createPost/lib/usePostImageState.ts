import { useState, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import type { ImageItem } from '@/entites/posts/createPost/api/types'

const MAX_IMAGES = 10

export const usePostImageState = () => {
    const [images, setImages] = useState<ImageItem[]>([])
    const [activeIndex, setActiveIndex] = useState(0)

    // утилита освобождает память временного URL
    const cleanupUrls = useCallback((items: ImageItem[]) => {
        items.forEach(img => {
            if (img.url) URL.revokeObjectURL(img.url)
            if (img.croppedPreviewUrl) URL.revokeObjectURL(img.croppedPreviewUrl)
        })
    }, [])

    //Принимает файлы → превращает их в ImageItem → добавляет в общий список картинок, не превышая лимит.
    const addImages = useCallback((files: File[]) => {
        setImages(prev => {

            // UI уже ограничивает количество файлов, но пусть останется комментарием на будущее
            // const remaining = MAX_IMAGES - prev.length
            // if (remaining <= 0) return prev

           // const filesToAdd = files.slice(0, remaining)

            const newImages: ImageItem[] = files.map(file => ({
                id: uuidv4(), // Твой UUID теперь главный герой
                file,
                url: URL.createObjectURL(file),
                crop: { x: 0, y: 0 },
                zoom: 1,
                aspect: 1,
                isCropped: false,
                filter: 'none'
            }))

            return [...prev, ...newImages]
        })
    }, [])

    // находит картинку в массиве и обновляет только то, что передано.
    const updateImage = useCallback((id: string, partial: Partial<ImageItem>) => {
        setImages(prev => prev.map(img => img.id === id ? { ...img, ...partial } : img))
    }, [])

    // удаление картинки
    const removeImage = useCallback((id: string) => {
        setImages(prev => {
            // Находим удаляемый объект по id, чтобы очистить память
            const imgToRemove = prev.find(img => img.id === id)
            if (imgToRemove) {
                cleanupUrls([imgToRemove])
            }

            //формируем новый массив, просто исключаем удалённый объект
            const newImages = prev.filter(img => img.id !== id)

            // корректируем активный индекс для слайдера.
            setActiveIndex(curr => {
                if (newImages.length === 0) return 0
                return Math.min(curr, newImages.length - 1)
            })

            // возвращаем новый массив
            return newImages
        })
    }, [cleanupUrls])

    // использ призакрытии модалки, отмене создания поста
    const resetImages = useCallback(() => {
        cleanupUrls(images)
        setImages([])
        setActiveIndex(0)
    }, [images, cleanupUrls])

    return {
        images,
        activeIndex,
        setActiveIndex,
        addImages,
        updateImage,
        removeImage,
        resetImages,
        hasImages: images.length > 0
    }
}