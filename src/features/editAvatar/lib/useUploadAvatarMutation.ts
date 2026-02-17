//todo : перенести в shared

'use client'

import {client} from "@/shared/api/client";
import { useMutation, useQueryClient } from '@tanstack/react-query'

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

export const useUploadAvatarMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['upload profile avatar'],
        mutationFn: async (file: File): Promise<UploadAvatarResponse> => {

            await client.GET("/api/v1/auth/me").catch(() => null);

            const formData = new FormData()
            formData.append('file', file)

            const response = await client.POST('/api/v1/users/profile/avatar', {
                // @ts-expect-error multipart form is allowed
                body: formData,
            })

            return response.data as UploadAvatarResponse
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['my profile data'],
            })
        },
    })
}
