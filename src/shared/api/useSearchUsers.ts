import { useInfiniteQuery } from '@tanstack/react-query'
import { client } from '@/shared/api/client'
import { SchemaUserWithPaginationViewDto } from '@/shared/api/schema'

const SEARCH_PAGE_SIZE = 12

export const useSearchUsers = (search: string) => {
  return useInfiniteQuery({
    queryKey: ['search users', search],
    initialPageParam: 1,
    enabled: !!search.trim(),
    queryFn: async ({ pageParam }) => {
      const response = await client.GET('/api/v1/users', {
        params: {
          query: {
            search,
            pageNumber: pageParam,
            pageSize: SEARCH_PAGE_SIZE,
          },
        },
      })

      if (response.error) {
        throw response.error
      }

      return response.data as SchemaUserWithPaginationViewDto
    },
    getNextPageParam: lastPage => {
      const hasNextPage = lastPage.page < lastPage.pagesCount

      if (!hasNextPage) {
        return undefined
      }

      return lastPage.page + 1
    },
  })
}
