import React, {ChangeEvent, useRef, useState} from 'react'
import {Button} from "@/shared/ui/Button/Button"
import {Icon} from "@/shared/ui/Icon/Icon"
import s from './UploadStep.module.scss'

// валидация
const MAX_SIZE = 20 * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/png']

const validateFiles = (files: File[]) => {
    const valid: File[] = []
    const errors: string[] = []

    files.forEach(file => {
        const isAllowed = ALLOWED_TYPES.includes(file.type)
        const isSmall = file.size <= MAX_SIZE

        if (!isAllowed) errors.push(`Unsupported format`)
        if (!isSmall) errors.push(`File is too large (max 20MB)`)

        if (isAllowed && isSmall) valid.push(file)
    })

    return { validFiles: valid, errors }
}


type Props = {
    onUpload: (files: File[]) => void
    remainingSlots: number
}

export const UploadStep = ({ onUpload, remainingSlots }: Props) => {

    const [alertMessage, setAlertMessage] = useState<string | null>(null)


    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return

        const files = Array.from(e.target.files)
        const { validFiles, errors } = validateFiles(files)

        if (errors.length) {
            setAlertMessage(errors.join('\n'))
        }

        if (validFiles.length > remainingSlots) {
            setAlertMessage(`You can only upload ${remainingSlots} more images.`)
            return
        }

        const finalFiles = validFiles.slice(0, remainingSlots)
        if (finalFiles.length > 0) {
            onUpload(finalFiles)
        }

        e.target.value = ''
    }


    return (
        <div className={s.addPhotoWrapper}>
            <div className={s.iconWrapper}>
                <Icon iconId='create-post-icon' size={48} fill='white' viewBox='0 0 48 48' />
            </div>
            <Button
                variant="primary"
                onClick={() => fileInputRef.current?.click()} //тут вызываю клик по инпуту
                disabled={remainingSlots <= 0}
            >
                Select from Computer
            </Button>
            <input
                ref={fileInputRef} // тут мы "подключили" инпут
                type="file"
                accept={ALLOWED_TYPES.join(',')}
                multiple
                hidden //прячем инпут
                onChange={handleChange}
            />
        </div>
    )
}