'use client'

import React from 'react'
import { UploadStep } from '@/entites/posts/createPost/ui/steps/Step1Upload/UploadStep'
import { useAvatarUpload } from '@/features/editAvatar/lib/useAvatarUpload'
import { useUploadAvatarMutation } from '@/features/editAvatar/lib/useUploadAvatarMutation'
import { useModal } from '@/widgets/modal/model/modal.context'
import {Button} from "@/shared/ui/Button/Button";
import {Card} from "@/shared/ui/Card/Card";
import s from './ProfilePhotoModal.module.scss'
export const ProfilePhotoModal = () => {
    const avatar = useAvatarUpload()
    const { clearModals } = useModal()
    const { mutateAsync, isPending } = useUploadAvatarMutation()


    const handleSave = async () => {
        if (!avatar.file) return

        try {
            const data = await mutateAsync(avatar.file)
            avatar.reset()
            clearModals()
        } catch (e) {
           // console.error('Avatar upload error', e)
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
                <UploadStep onUpload={handleUpload} remainingSlots={1} maxSizeMB={10}/>
            )}

            {avatar.previewUrl && (
                <div className={s.profilePhoto}>

                    <Card
                        images={avatar.previewUrl}
                        variant="circular"
                        width={340}
                        height={340}
                    />
                    <div className={s.buttonContainer} >
                        <Button
                            width={86}
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
