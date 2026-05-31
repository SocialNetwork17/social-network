import {SchemaUserFollowingFollowersViewModel} from '@/shared/api/schema'
import {useFollowersQuery} from '@/shared/api/useFollowersQuery'
import {useFollowingQuery} from '@/shared/api/useFollowingQuery'
import {useFollowUserMutation} from '@/shared/api/useFollowUserMutation'
import {useUnfollowUserMutation} from '@/shared/api/useUnfollowUserMutation'
import {useQueryClient} from '@tanstack/react-query'
import {useEffect, useMemo, useRef, useState} from 'react'

type Params = {
  modalType: 'followers' | 'following'
  userName: string
  onFollowingCountChange: (updater: (prev: number) => number) => void
}

export const useFollowersFollowingModal = ({modalType, userName, onFollowingCountChange}: Params) => {
  const [usersMap, setUsersMap] = useState<Record<number, SchemaUserFollowingFollowersViewModel>>({})
  const [pendingActionUserId, setPendingActionUserId] = useState<number | null>(null)
  const [isDataInitialized, setIsDataInitialized] = useState(false)

  const loadMoreRef = useRef<HTMLDivElement | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

  const queryClient = useQueryClient()
  const followMutation = useFollowUserMutation()
  const unfollowMutation = useUnfollowUserMutation()

  const {
    data: followersData,
    fetchNextPage: fetchNextFollowers,
    hasNextPage: hasNextFollowers,
    isFetchingNextPage: isFetchingNextFollowers,
    isLoading: isFollowersLoading,
  } = useFollowersQuery(userName, modalType === 'followers')

  const {
    data: followingData,
    fetchNextPage: fetchNextFollowing,
    hasNextPage: hasNextFollowing,
    isFetchingNextPage: isFetchingNextFollowing,
    isLoading: isFollowingLoading,
  } = useFollowingQuery(userName, modalType === 'following')

  const modalUsers = useMemo(() => {
    if (modalType === 'followers') {
      const allFollowers = followersData?.pages.flatMap(page => page.items ?? []) ?? []
      return allFollowers.filter(user => !user.isFollowing)
    }

    return followingData?.pages.flatMap(page => page.items ?? []) ?? []
  }, [followersData, followingData, modalType])
  console.log('modalUsers ', modalUsers)

  const isModalLoading = modalType === 'followers' ? isFollowersLoading : isFollowingLoading
  const isFetchingNextPage = modalType === 'followers' ? isFetchingNextFollowers : isFetchingNextFollowing
  const hasNextPage = modalType === 'followers' ? hasNextFollowers : hasNextFollowing

  // Initial data loading
  useEffect(() => {
    if (!isDataInitialized && modalUsers.length > 0) {
      const initialMap: Record<number, SchemaUserFollowingFollowersViewModel> = {}
      modalUsers.forEach(listUser => {
        initialMap[listUser.id] = listUser
      })
      setUsersMap(initialMap)
      setIsDataInitialized(true)
    }
  }, [modalUsers, isDataInitialized])

  useEffect(() => {
    const target = loadMoreRef.current
    const container = scrollContainerRef.current

    if (!target || !hasNextPage) {
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        if (!entries[0]?.isIntersecting || isFetchingNextPage) {
          return
        }

        if (modalType === 'followers') {
          fetchNextFollowers()

          return
        }

        fetchNextFollowing()
      },
      {threshold: 0.5, root: container},
    )

    observer.observe(target)

    return () => observer.disconnect()
  }, [fetchNextFollowers, fetchNextFollowing, hasNextPage, isFetchingNextPage, modalType])

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const onToggleFollowInModal = async (listUser: SchemaUserFollowingFollowersViewModel) => {
    const currentUser = usersMap[listUser.id] ?? listUser

    setPendingActionUserId(currentUser.id)

    // Optimistic update
    setUsersMap(prev => ({
      ...prev,
      [currentUser.id]: {...currentUser, isFollowing: !currentUser.isFollowing},
    }))

    try {
      if (currentUser.isFollowing) {
        await unfollowMutation.mutateAsync(
            {userId: currentUser.userId},
            {
              onSuccess: () => {
                if (modalType === 'following') {
                  queryClient.invalidateQueries({queryKey: ['following', userName]})
                }
              },
            }
        )
        onFollowingCountChange(prev => Math.max(prev - 1, 0))

        // Only refresh data for specific cases
        if (modalType !== 'following') {
          await queryClient.invalidateQueries({queryKey: ['followers', userName]})
        }
      } else {
        await followMutation.mutateAsync(
            {selectedUserId: currentUser.userId},
            {
              onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ['followers', userName]})
                onFollowingCountChange(prev => prev + 1)
              },
            }
        )
      }
    } catch (error) {
      // Revert on error
      setUsersMap(prev => ({
        ...prev,
        [currentUser.id]: {...currentUser, isFollowing: currentUser.isFollowing},
      }))
      throw error
    } finally {
      setPendingActionUserId(null)
    }
  }

  const getButtonText = (listUser: SchemaUserFollowingFollowersViewModel) => {
    if (modalType === 'following') {
      return 'Unfollow'
    }

    return listUser.isFollowing ? 'Unfollow' : 'Follow'
  }

  return {
    usersMap,
    pendingActionUserId,
    loadMoreRef,
    scrollContainerRef,
    modalUsers,
    isModalLoading,
    isFetchingNextPage,
    onToggleFollowInModal,
    getButtonText,
  }
}
