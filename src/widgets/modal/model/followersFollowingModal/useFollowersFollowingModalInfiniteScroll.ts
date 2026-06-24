import {useEffect, useRef, type RefObject} from 'react'

type Params = {
  fetchNextPage: () => void
  hasNextPage: boolean
  isFetchingNextPage: boolean
}

type Result = {
  loadMoreRef: RefObject<HTMLDivElement | null>
  scrollContainerRef: RefObject<HTMLDivElement | null>
}

export const useFollowersFollowingModalInfiniteScroll = ({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: Params): Result => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const target = loadMoreRef.current
    const container = scrollContainerRef.current

    if (!target || !hasNextPage) {
      return
    }

    const observer = new IntersectionObserver(entries => {
      if (!entries[0]?.isIntersecting || isFetchingNextPage) {
        return
      }

      fetchNextPage()
    }, {threshold: 0.5, root: container})

    observer.observe(target)

    return () => observer.disconnect()
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  return {
    loadMoreRef,
    scrollContainerRef,
  }
}
