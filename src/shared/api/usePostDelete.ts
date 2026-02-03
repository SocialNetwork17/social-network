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
                        postId: 1154549584,
                    },
                },
            })
            if (!response.data) {
                throw new Error('No data received from server')
            }

            return response
        },



        onSuccess: (_, postId) => {
            // Инвалидируем кэш постов после успешного удаления
            // queryClient.invalidateQueries({
            //     predicate: (query) => {
            //         // Преобразуем ключ в строку для поиска
            //         const keyString = JSON.stringify(query.queryKey).toLowerCase()
            //         return keyString.includes('post') || keyString.includes('profile')
            //     }
            // })
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

            console.error('Error deleting post:', error)
            // Можно добавить уведомление об ошибке
            return error
        }
    })
}