import { useMutation } from '@tanstack/react-query'
import { client } from '@/shared/api/client'

type UpdatePostLikeStatusArgs = {
  postId: number
  likeStatus: 'NONE' | 'LIKE'
}

export const useUpdatePostLikeStatusMutation = () => {
  return useMutation({
    mutationKey: ['post', 'like-status'],
    mutationFn: async ({ postId, likeStatus }: UpdatePostLikeStatusArgs) => {
      const response = await client.PUT('/api/v1/posts/{postId}/like-status', {
        params: {
          path: {
            postId,
          },
        },
        body: {
          likeStatus,
        },
      })

      if (response.error) {
        throw response.error
      }

      return response.data
    },
  })
}
