import { useMutation, useQueryClient } from '@tanstack/react-query'
import { client } from '@/shared/api/client'

type UpdateAnswerLikeArgs = {
  postId: number
  commentId: number
  answerId: number
  likeStatus: 'NONE' | 'LIKE' | 'DISLIKE'
}

export const useAddLikeAnswerMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['update answer like'],
    mutationFn: async ({ postId, commentId, answerId, likeStatus }: UpdateAnswerLikeArgs) => {
      await client.GET('/api/v1/auth/me').catch(() => null)

      const response = await client.PUT(
        '/api/v1/posts/{postId}/comments/{commentId}/answers/{answerId}/like-status',
        {
          params: {
            path: {
              postId,
              commentId,
              answerId,
            },
          },
          body: {
            likeStatus,
          },
        }
      )

      if (response.error) {
        throw new Error(response.error || 'Update likes was failed')
      }

      return response.data
    },

    onSuccess: (_, { postId, commentId }) => {
      queryClient.invalidateQueries({
        queryKey: ['answers', postId, commentId],
        exact: false,
      })
      queryClient.invalidateQueries({
        queryKey: ['comment', postId],
        exact: false,
      })
    },
  })
}
