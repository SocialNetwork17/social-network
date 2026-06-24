import { useInfiniteQuery } from '@tanstack/react-query'
import { client } from '@/shared/api/client'
import { SchemaFollowingWithPaginationViewModel } from '@/shared/api/schema'

const PAGE_SIZE = 12

export const useFollowersQuery = (userName: string, enabled: boolean) => {
  return useInfiniteQuery({
    queryKey: ['followers', userName],
    initialPageParam: 1,
    enabled: enabled && !!userName,
    queryFn: async ({ pageParam }) => {
      const response = await client.GET('/api/v1/users/{userName}/followers', {
        params: {
          path: {
            userName,
          },
          query: {
            pageNumber: pageParam,
            pageSize: PAGE_SIZE,
          },
        },
      })

      if (response.error) {
        throw response.error
      }

      return response.data as SchemaFollowingWithPaginationViewModel
    },
    getNextPageParam: lastPage => {
      if (lastPage.page >= lastPage.pagesCount) {
        return undefined
      }

      return lastPage.page + 1
    },
  })
}