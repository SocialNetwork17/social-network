import { useMutation, useQueryClient } from '@tanstack/react-query'
import { client } from '@/shared/api/client'

type CreateCommentArgs = {
    postId: number
    content: string
}

export const useCreateCommentMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['createComment'], // нужно перепроверить с чем завязан mutation
        mutationFn: async ({ postId, content }: CreateCommentArgs) => {
            await client.GET("/api/v1/auth/me").catch(() => null);

            const response = await client.POST('/api/v1/posts/{postId}/comments', {
                params: {
                    path: {
                        postId,
                    },
                },
                body: {
                    content,
                },
            })

            if (response.error) {
                throw new Error(response.error?.messages?.[0]?.message || 'Create post failed')
            }

            return response.data
        },

        onSuccess: (_, { postId }) => {
            queryClient.invalidateQueries({
                queryKey: ['posts feed', postId], // нужно перепроверить с чем завязан mutation
                exact: false, // exact: false означает "все, что начинается с этого ключа"
            })
        },
    })
}
