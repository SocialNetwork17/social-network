import { useMutation, useQueryClient } from '@tanstack/react-query'
import { client } from '@/shared/api/client'

type UpdatePostArgs = {
    postId: number
    description: string
}

export const useUpdatePostMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['editPost'],
        mutationFn: async ({ postId, description }: UpdatePostArgs) => {
            await client.GET("/api/v1/auth/me").catch(() => null);

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

            return null
        },

        onSuccess: (_, { postId }) => {
            // queryClient.invalidateQueries({
            //     queryKey: ['post', postId],
            // })
            //
            // queryClient.invalidateQueries({
            //     queryKey: ['userPosts'],
            // })

            queryClient.invalidateQueries({
                queryKey: ['posts', 'via-profile'],
                exact: false, // exact: false означает "все, что начинается с этого ключа"
            })
            queryClient.invalidateQueries({
                queryKey: ['post', postId],
                exact: false, // exact: false означает "все, что начинается с этого ключа"
            })

        },
    })
}
