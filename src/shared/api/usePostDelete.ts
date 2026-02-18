import {useMutation, useQueryClient } from '@tanstack/react-query'
import { client } from '@/shared/api/client'

export const useDeletePost = () => {
    const queryClient = useQueryClient ()

    return useMutation({
        mutationKey: ['deletePost'],
        mutationFn: async (postId: number) => {
            const response = await client.DELETE(`/api/v1/posts/{postId}`, {
                params: {
                    path: {
                        postId
                    },
                },
            })
            // Если есть данные, возвращаем их
            if (response.data) {
                return response.data
            }
            // Если есть ошибка в response
            if (response.error) {
                // Пробрасываем ошибку, чтобы компонент мог её обработать
                throw response.error
            }
        },



        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['posts', 'via-profile'],
                exact: false, // exact: false означает "все, что начинается с этого ключа"
            })
            queryClient.invalidateQueries({
                queryKey: ['posts', 'feed'],
                exact: false, // exact: false означает "все, что начинается с этого ключа"
            })
        },
        onError: (error) => {
            return error
        }
    })
}