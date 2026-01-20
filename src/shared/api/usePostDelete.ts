import {useMutation, useQueryClient } from '@tanstack/react-query'
import { client } from '@/shared/api/client'

export const useDeletePost = () => {
    const queryClient = useQueryClient ()

    return useMutation({
        mutationFn: async (postId: number) => {
            return await client.DELETE(`/api/v1/posts/{postId}`, {
                params: {
                    path: {
                        postId,
                    },
                },
            })
        },

        onSuccess: (_, postId) => {
            // Инвалидируем кэш постов после успешного удаления
            queryClient.invalidateQueries({
                predicate: (query) => {
                    // Преобразуем ключ в строку для поиска
                    const keyString = JSON.stringify(query.queryKey).toLowerCase()
                    return keyString.includes('post') || keyString.includes('profile')
                }
            })
        },
        onError: (error) => {
            console.error('Error deleting post:', error)
            // Можно добавить уведомление об ошибке
        }
    })
}