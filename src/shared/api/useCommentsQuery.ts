import { useQuery } from '@tanstack/react-query'
import { client } from '@/shared/api/client'

export const useCommentsQuery = (postId?: number) => {
  return useQuery({
    queryKey: ['comment', postId],
    queryFn: async () => {
      if (!postId) {
        throw new Error('Post ID is required')
      }
      const response = await client.GET(`/api/v1/posts/{postId}/comments`, {
        params: {
          path: {
            postId: postId,
          },
        },
      })
      return response.data
    },
    enabled: !!postId,
  })
}





