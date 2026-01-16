import { useQuery } from '@tanstack/react-query'
import { client } from '@/shared/api/client'

export const useUserPostsQuery = (
  userId: number,
  pageSize: number = 8,
  sortDirection: 'asc' | 'desc' = 'desc',
  endCursorPostId?: number
) => {
  return useQuery({
    queryKey: ['user posts by userId', { pageSize, sortDirection, endCursorPostId, userId }],
    queryFn: async () => {
      const response = await client.GET(`/api/v1/posts/user/{userId}/{endCursorPostId}`, {
        params: {
          query: {
            pageSize,
            sortDirection,
          },
          path: {
            endCursorPostId: endCursorPostId || 0,
            userId: userId
          },
        },
      })

      if (!response.data) {
        throw new Error('No data received from server')
      }

      return response.data 
    },
  })
}
