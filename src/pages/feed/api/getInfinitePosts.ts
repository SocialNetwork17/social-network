'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { client } from '@/shared/api/client'
import { SchemaPostViewModel } from '@/shared/api/schema'
import { AllPosts } from '@/entites/posts/model/types'

type Props = {
  lastPostId: number
  pageSize?: number
  totalCount: number
  initialLoadedCount: number
}

export function getInfinitePosts({ 
  lastPostId, 
  pageSize = 4, 
  totalCount,
  initialLoadedCount 
}: Props) {
  const [posts, setPosts] = useState<SchemaPostViewModel[]>([])
  const [loading, setLoading] = useState(false)
  
  // Вычисляем hasMore на основе общего количества и уже загруженных постов
  const [loadedCount, setLoadedCount] = useState(initialLoadedCount)
  const [hasMore, setHasMore] = useState(initialLoadedCount < totalCount)
  
  const [currentCursor, setCurrentCursor] = useState(lastPostId)
  const observerTarget = useRef<HTMLDivElement>(null)

  const loadMore = useCallback(async () => {
    // Проверяем, можно ли загружать
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

      const data = response.data as AllPosts
      const newPosts = data.items || []
      
      // Обновляем количество загруженных постов
      const newLoadedCount = loadedCount + newPosts.length
      setLoadedCount(newLoadedCount)

      if (newPosts.length === 0) {
        // Если новых постов нет - точно конец
        setHasMore(false)
      } else {
        // Добавляем новые посты
        setPosts(prev => [...prev, ...newPosts])
        
        // Обновляем курсор для следующего запроса
        const lastPostIdFromNew = newPosts[newPosts.length - 1]?.id
        if (lastPostIdFromNew) {
          setCurrentCursor(lastPostIdFromNew)
        }

        // ВАЖНО: проверяем, есть ли ещё посты на основе общего количества
        // Если загрузили все посты (loadedCount >= totalCount) - больше нет
        const hasMorePosts = newLoadedCount < totalCount
        setHasMore(hasMorePosts)
      }
    } catch (error) {
      console.error('Error loading more posts:', error)
    } finally {
      setLoading(false)
    }
  }, [currentCursor, loading, hasMore, pageSize, loadedCount, totalCount])

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