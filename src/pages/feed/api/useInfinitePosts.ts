'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { SchemaPostViewModel } from '@/shared/api/schema'
import { AllPosts, getAllPosts } from './getAllPosts'

export const useInfinitePosts = (initialPosts: SchemaPostViewModel[], totalCount: number) => {
  const pageSize = 20

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteQuery({
    queryKey: ['posts feed'],
    queryFn: ({ pageParam = 0 }) => getAllPosts(pageSize, 'desc', pageParam),
    getNextPageParam: lastPage => {
      const lastItem = lastPage.items[lastPage.items?.length - 1]
      const lastId = lastItem?.id ?? undefined
      return lastId
    },
    initialData: {
      pages: [
        {
          items: initialPosts,
          totalCount: totalCount,
        },
      ] as AllPosts[],
      pageParams: [0],
    },
    initialPageParam: 0,

    staleTime: 5 * 60 * 1000, // 5 минут - данные считаются свежими
    refetchInterval: 5 * 60 * 1000, // Автоматически обновлять каждые 5 минут
    refetchIntervalInBackground: true, // Обновлять даже если вкладка не активна
  })

  const allPosts = data?.pages.flatMap(page => page.items) ?? []

  const observerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    )

    const currentTarget = observerRef.current
    if (currentTarget) observer.observe(currentTarget)

    return () => {
      if (currentTarget) observer.unobserve(currentTarget)
      observer.disconnect()
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  return {
    posts: allPosts,
    observerRef,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  }
}
