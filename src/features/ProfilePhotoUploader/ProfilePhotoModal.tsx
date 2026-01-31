'use client'

import React from 'react'
import { UploadStep } from '@/entites/posts/createPost/ui/steps/Step1Upload/UploadStep'
import { useAvatarUpload } from './lib/useAvatarUpload'
import { useUploadAvatarMutation } from './lib/useUploadAvatarMutation'
import { useModal } from '@/widgets/modal/model/modal.context'
import {Button} from "@/shared/ui/Button/Button";

export const ProfilePhotoModal = () => {
    const avatar = useAvatarUpload()
    const { clearModals } = useModal()
    const { mutateAsync, isPending } = useUploadAvatarMutation()

    const handleClose = () => {
        avatar.reset()
        clearModals()
    }

    const handleSave = async () => {
        if (!avatar.file) return

        try {
            const data = await mutateAsync(avatar.file)
            console.log('Uploaded avatars:', data.avatars) // можно использовать по необходимости
            handleClose()
        } catch (e) {
            console.error('Avatar upload error', e)
        }
    }

    const handleUpload = (files: File[]) => {
        if (files[0]) {
            avatar.setFile(files[0])
        }
    }

    return (
        <div>
            {!avatar.hasPhoto && (
                <UploadStep onUpload={handleUpload} remainingSlots={1} />
            )}

            {avatar.previewUrl && (
                <div style={{padding: '28px 50px 36px'}}>
                    <img
                        src={avatar.previewUrl}
                        alt="Profile preview"
                        style={{ width: 340, height: 340,
                           // padding: '28px 80px 36px',
                            borderRadius: '50%', objectFit: 'cover', marginBottom: 16 }}
                    />

                    <div>
                        <Button
                            variant={'primary'}
                            onClick={handleSave}
                            disabled={!avatar.hasPhoto || isPending}
                        >
                            {isPending ? 'Saving...' : 'Save'}
                        </Button>
                    </div>

                </div>
            )}
        </div>
    )
}
