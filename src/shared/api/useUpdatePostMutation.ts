import { useMutation, useQueryClient } from '@tanstack/react-query'
import { client } from '@/shared/api/client'

type UpdatePostArgs = {
    postId: number
    description: string
}

export const useUpdatePostMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ postId, description }: UpdatePostArgs) => {
            const response = await client.PUT('/api/v1/posts/{postId}', {
                params: {
                    path: {
                        postId,
                    },
                },
                body: {
                    description,
                },
            })

            if (response.error) {
                throw response.error
            }

            return null // 204 No Content
        },

        onSuccess: (_, { postId }) => {
            queryClient.invalidateQueries({
                queryKey: ['post', postId],
            })

            queryClient.invalidateQueries({
                queryKey: ['userPosts'],
            })
        },
    })
}
