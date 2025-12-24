import { useQuery } from '@tanstack/react-query'
import { client } from '@/shared/api/client'

export const usePostQuery = (postId: string) => {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      const response = await client.GET(`/api/v1/posts/id/{postId}`, {
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





