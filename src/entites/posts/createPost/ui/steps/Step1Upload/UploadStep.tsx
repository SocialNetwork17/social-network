import React, {ChangeEvent, useRef, useState} from 'react'
import {Button} from "@/shared/ui/Button/Button"
import {Icon} from "@/shared/ui/Icon/Icon"
import s from './UploadStep.module.scss'
import { useModal } from '@/widgets/modal/model/modal.context'
import { uploadErrorModalAC } from '@/widgets/modal/model/modal.types'

type Props = {
    onUpload: (files: File[]) => void
    remainingSlots: number
    maxSizeMB?: number
}

const ALLOWED_TYPES = ['image/jpeg', 'image/png']

const validateFiles = (files: File[], maxSize: number) => {
    const valid: File[] = []
    const errors: string[] = []

    files.forEach(file => {
        const isAllowed = ALLOWED_TYPES.includes(file.type)
        const isSmall = file.size <= maxSize

        if (!isAllowed) errors.push(`Unsupported format`)
        if (!isSmall) errors.push(`File is too large (max ${maxSize / 1024 / 1024}MB)`)

        if (isAllowed && isSmall) valid.push(file)
    })

    return { validFiles: valid, errors }
}

export const UploadStep = ({
                               onUpload,
                               remainingSlots,
                               maxSizeMB = 20,
                           }: Props) => {

    const { pushModal } = useModal()
    const fileInputRef = useRef<HTMLInputElement>(null)

    const maxSizeBytes = maxSizeMB * 1024 * 1024

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return

        const files = Array.from(e.target.files)

        const { validFiles, errors } = validateFiles(files, maxSizeBytes)

        if (errors.length) {
            pushModal(
                uploadErrorModalAC({
                    title: 'Upload error',
                    description: errors.join('\n'),
                })
            )
            e.target.value = ''
            return
        }

        if (validFiles.length > remainingSlots) {
            pushModal(
                uploadErrorModalAC({
                    title: 'Upload error',
                    description: `You can upload only ${remainingSlots} more images.`,
                })
            )
            e.target.value = ''
            return
        }

        onUpload(validFiles)
        e.target.value = ''
    }

    return (
        <div className={s.addPhotoWrapper}>
            <div className={s.iconWrapper}>
                <Icon iconId='create-post-icon' size={48} fill='white' viewBox='0 0 48 48' />
            </div>

            <Button
                variant="primary"
                onClick={() => fileInputRef.current?.click()}
                disabled={remainingSlots <= 0}
            >
                Select from Computer
            </Button>

            <input
                ref={fileInputRef}
                type="file"
                accept={ALLOWED_TYPES.join(',')}
                multiple
                hidden
                onChange={handleChange}
            />
        </div>
    )
}
