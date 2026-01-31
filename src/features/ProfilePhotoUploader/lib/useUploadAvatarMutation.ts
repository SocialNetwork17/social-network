//todo : перенести в shared

'use client'

export type AvatarInfo = {
    url: string
    width: number
    height: number
    fileSize: number
    createdAt: string
}

export type UploadAvatarResponse = {
    avatars: AvatarInfo[]
}


import { useMutation } from '@tanstack/react-query'
import { client } from '@/shared/api/client'

export const useUploadAvatarMutation = () => {
    return useMutation({
        mutationFn: async (file: File): Promise<UploadAvatarResponse> => {
            const formData = new FormData()
            formData.append('file', file) // ⚠️ важно: Swagger говорит "file"

            const response = await client.POST('/api/v1/users/profile/avatar', {
                body: formData,
            })

            return response.data as UploadAvatarResponse
        },
    })
}
