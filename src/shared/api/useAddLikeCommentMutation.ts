import { useMutation, useQueryClient } from '@tanstack/react-query'
import { client } from '@/shared/api/client'

type UpdateCommentLikeArgs = {
  postId: number
  commentId: number
  likeStatus: 'NONE' | 'LIKE' | 'DISLIKE'
}

export const useAddLikeCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['update comment like'],
    mutationFn: async ({ postId, commentId, likeStatus }: UpdateCommentLikeArgs) => {
      await client.GET('/api/v1/auth/me').catch(() => null)

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
        queryKey: ['comment', postId],
        exact: false,
      })
    },
  })
}
