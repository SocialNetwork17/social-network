import { useQuery } from '@tanstack/react-query'
import { client } from '@/shared/api/client'
import { AllPosts } from '@/entites/profile/userData'
import { SchemaInfinityPaginatedPosts } from '@/shared/api/schema'

export const useAllPostsQuery = (
  pageSize: number = 12,
  sortDirection: 'asc' | 'desc' = 'desc',
  endCursorPostId?: number
) => {
  return useQuery<AllPosts, Error>({
    queryKey: ['all posts', { pageSize, sortDirection, endCursorPostId }],
    queryFn: async () => {
      const response = await client.GET(`/api/v1/posts/all/{endCursorPostId}`, {
        params: {
          query: {
            pageSize,
            sortDirection,
          },
          path: {
            endCursorPostId: endCursorPostId || 0,
          },
        },
      })

      if (!response.data) {
        throw new Error('No data received from server')
      }

      return response.data as AllPosts
    },
  })
}
