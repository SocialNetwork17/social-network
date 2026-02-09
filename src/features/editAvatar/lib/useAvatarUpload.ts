'use client'

import { useEffect, useState, useCallback } from 'react'

export const useAvatarUpload = () => {
    const [file, setFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    useEffect(() => {
        if (!file) return

        const url = URL.createObjectURL(file)
        setPreviewUrl(url)

        return () => URL.revokeObjectURL(url)
    }, [file])

    const reset = useCallback(() => {
        setFile(null)
        setPreviewUrl(null)
    }, [])

    return {
        file,
        previewUrl,
        setFile,
        reset,
        hasPhoto: Boolean(file),
    }
}
