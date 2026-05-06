'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { client } from '@/shared/api/client'
import { SchemaPostViewModel } from '@/shared/api/schema'
import { AllPosts } from '@/entites/posts/model/types'

interface UseInfinitePostsProps {
  lastPostId: number
  pageSize?: number
}

export function getInfinitePosts({ lastPostId, pageSize = 4 }: UseInfinitePostsProps) {
  const [posts, setPosts] = useState<SchemaPostViewModel[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [currentCursor, setCurrentCursor] = useState(lastPostId)

  const observerTarget = useRef<HTMLDivElement>(null)

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)

    try {
      const response = await client.GET('/api/v1/posts/all/{endCursorPostId}', {
        params: {
          path: { endCursorPostId: currentCursor },
          query: { pageSize, sortDirection: 'desc' },
        },
      })

      if (!response.data) {
        throw new Error('No data received from server')
      }

      // ИСПРАВЛЕНИЕ: берем массив из response.data.items
      const data = response.data as AllPosts
      const newPosts = data.items || []

      if (newPosts.length === 0) {
        setHasMore(false)
      } else {
        setPosts(prev => [...prev, ...newPosts])
        const lastPostIdFromNew = newPosts[newPosts.length - 1]?.id

        if (lastPostIdFromNew) {
          setCurrentCursor(lastPostIdFromNew)
        }

        setHasMore(newPosts.length === pageSize)
      }
    } catch (error) {
      console.error('Error loading more posts:', error)
    } finally {
      setLoading(false)
    }
  }, [currentCursor, loading, hasMore, pageSize])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0]?.isIntersecting && hasMore && !loading) {
          loadMore()
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    )

    const currentTarget = observerTarget.current

    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
      observer.disconnect()
    }
  }, [loadMore, hasMore, loading])

  return { posts, loading, hasMore, observerTarget }
}
