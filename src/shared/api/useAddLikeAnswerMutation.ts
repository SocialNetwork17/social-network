import { useMutation, useQueryClient } from '@tanstack/react-query'
import { client } from '@/shared/api/client'

type CreateCommentArgs = {
    postId: number
    commentId: number
    likeStatus: "NONE" | "LIKE" | "DISLIKE"
}

export const useAddLikeAnswerMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['update comment like'], // нужно перепроверить с чем завязан mutation
        mutationFn: async ({ postId, commentId,  likeStatus }: CreateCommentArgs) => {
            await client.GET("/api/v1/auth/me").catch(() => null);

            const response = await client.PUT('/api/v1/posts/{postId}/comments/{commentId}/like-status', {
                params: {
                    path: {
                        postId,
                        commentId,
                    },
                },
                body: {
                    likeStatus,
                },
            })

            if (response.error) {
                throw new Error(response.error || 'Update likes was failed')
            }

            return response.data
        },

        onSuccess: (_, { postId }) => {
            queryClient.invalidateQueries({
                queryKey: ['comment', postId], // нужно перепроверить с чем завязан mutation
                exact: false, // exact: false означает "все, что начинается с этого ключа"
            })
        },
    })
}
