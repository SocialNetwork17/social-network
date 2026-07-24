'use client'

import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { client } from '@/shared/api/client'
import { SchemaPostViewModel } from '@/shared/api/schema'
import { favoritesStorage } from '../model/favoritesStorage'

const useFavoritePostIds = () => {
  const [postIds, setPostIds] = useState<number[]>([])

  useEffect(() => {
    const syncPostIds = () => {
      setPostIds(favoritesStorage.getPostIds())
    }

    syncPostIds()

    return favoritesStorage.subscribe(syncPostIds)
  }, [])

  return postIds
}

export const useFavoritePostsQuery = (enabled: boolean) => {
  const postIds = useFavoritePostIds()

  const query = useQuery({
    queryKey: ['favorites', 'posts', postIds],
    enabled: enabled && postIds.length > 0,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const posts = await Promise.all(
        postIds.map(async postId => {
          const response = await client.GET('/api/v1/posts/id/{postId}', {
            params: {
              path: {
                postId,
              },
            },
          })

          if (response.error || !response.data) {
            return null
          }

          return response.data
        })
      )

      return posts.filter((post): post is SchemaPostViewModel => Boolean(post))
    },
  })

  return {
    ...query,
    postIds,
  }
}
