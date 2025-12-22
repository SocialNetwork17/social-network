'use client'

import React, { useEffect } from 'react'
import type { ImageItem } from '@/entites/posts/createPost/model/types'
import {
    useUploadImagesMutation,
    useCreatePostMutation,
} from '@/entites/posts/createPost/model/usePostsMutations'

type Props = {
    images: ImageItem[]
    description: string
    setDescription: (s: string) => void
    onBack: () => void
    onClose: () => void
}

export const DescriptionStep = ({
                                    images,
                                    description,
                                    setDescription,
                                    onBack,
                                    onClose,
                                }: Props) => {
    const uploadMut = useUploadImagesMutation()
    const createMut = useCreatePostMutation()

    const handlePublish = async () => {
        try {
            const files = images.map(it =>
                it.croppedBlob
                    ? new File([it.croppedBlob], it.file.name || 'img.jpg', {
                        type: 'image/jpeg',
                    })
                    : it.file
            )

            const uploaded = await uploadMut.mutateAsync(files)

            const childrenMetadata = uploaded.map(img => ({
                uploadId: img.uploadId,
            }))

            await createMut.mutateAsync({ description, childrenMetadata })

            onClose()
        } catch (err: any) {
            console.error(err)
            alert(err?.message || 'Publish failed')
        }
    }

    // ✅ создаём preview URL один раз
    useEffect(() => {
        images.forEach(it => {
            if (it.croppedBlob && !it.croppedPreviewUrl) {
                it.croppedPreviewUrl = URL.createObjectURL(it.croppedBlob)
            }
        })

        // ✅ cleanup
        return () => {
            images.forEach(it => {
                if (it.croppedPreviewUrl) {
                    URL.revokeObjectURL(it.croppedPreviewUrl)
                    it.croppedPreviewUrl = undefined
                }
            })
        }
    }, [images])

    return (
        <div>
            {/* превью выбранных изображений */}
            <div style={{ display: 'flex', gap: 8 }}>
                {images.map(it => (
                    <img
                        key={it.id}
                        src={it.croppedPreviewUrl ?? it.url}
                        style={{
                            width: it.croppedBlob ? 'auto' : 120,
                            height: 120,
                            objectFit: it.croppedBlob ? 'contain' : 'cover',
                        }}
                    />
                ))}
            </div>

            {/* описание поста */}
            <div style={{ marginTop: 12 }}>
                <textarea
                    rows={4}
                    maxLength={500}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Write a description (optional, max 500 chars)"
                    style={{ width: '100%' }}
                />
            </div>

            {/* кнопки */}
            <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                <button onClick={onBack}>Back</button>

                <button
                    onClick={handlePublish}
                    disabled={uploadMut.isPending || createMut.isPending}
                >
                    {uploadMut.isPending || createMut.isPending
                        ? 'Publishing...'
                        : 'Publish'}
                </button>

                <button onClick={onClose}>Cancel</button>
            </div>

            {(uploadMut.isError || createMut.isError) && (
                <div style={{ color: 'red', marginTop: 8 }}>
                    Publish failed
                </div>
            )}
        </div>
    )
}
