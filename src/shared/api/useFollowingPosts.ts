import {
  SchemaPostViewModel,
  SchemaPublicationsFollowersWithPaginationViewModel
} from '@/shared/api/schema'
import {useInfiniteQuery} from "@tanstack/react-query";
import {client} from "@/shared/api/client";
import {useAuth} from "@/shared/hooks/useAuth";

export type FollowingPosts = SchemaPublicationsFollowersWithPaginationViewModel & {
  items: SchemaPostViewModel[]
}

export const useFollowingPosts = (
  pageSize = 4
) => {
  const { isAuth } = useAuth()
  return useInfiniteQuery({
    queryKey: ['following-posts'],
    initialPageParam: 0, // 0 means "start from the beginning" (no cursor yet)
    enabled: isAuth,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    queryFn: async ({ pageParam }) => {
      const response = await client.GET('/api/v1/home/publications-followers', {
        params: { query: { pageSize, endCursorPostId: pageParam } }
      })

      if (response.error) {
        throw response.error
      }

      return response.data as FollowingPosts
    },
    getNextPageParam: (lastPage) => {
      // nextCursor is the ID of the last post on this page — pass it to get the next batch
      // When nextCursor is 0 or undefined there are no more posts
      if (!lastPage.nextCursor) {
        return undefined
      }
      return lastPage.nextCursor
    },
  })
}
