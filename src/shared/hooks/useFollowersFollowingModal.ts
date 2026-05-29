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
  const queryClient = useQueryClient()
  const followMutation = useFollowUserMutation()
  const unfollowMutation = useUnfollowUserMutation()
  const [usersMap, setUsersMap] = useState<Record<number, SchemaUserFollowingFollowersViewModel>>({})
  const [pendingActionUserId, setPendingActionUserId] = useState<number | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

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
      return followersData?.pages.flatMap(page => page.items ?? []) ?? []
    }

    return followingData?.pages.flatMap(page => page.items ?? []) ?? []
  }, [followersData, followingData, modalType])

  const isModalLoading = modalType === 'followers' ? isFollowersLoading : isFollowingLoading
  const isFetchingNextPage = modalType === 'followers' ? isFetchingNextFollowers : isFetchingNextFollowing
  const hasNextPage = modalType === 'followers' ? hasNextFollowers : hasNextFollowing

  useEffect(() => {
    setUsersMap(prev => {
      const nextUsersMap = {...prev}

      modalUsers.forEach(listUser => {
        const existingUser = nextUsersMap[listUser.id]

        nextUsersMap[listUser.id] = {
          ...listUser,
          isFollowing: existingUser?.isFollowing ?? listUser.isFollowing,
        }
      })

      return nextUsersMap
    })
  }, [modalUsers])

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
          },
        )
        onFollowingCountChange(prev => Math.max(prev - 1, 0))

        if (modalType === 'following') return

        setUsersMap(prev => ({
          ...prev,
          [currentUser.id]: {...currentUser, isFollowing: false},
        }))

        return
      }

      await followMutation.mutateAsync(
        {selectedUserId: currentUser.userId},
        {
          onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['followers', userName]})
            onFollowingCountChange(prev => prev + 1)
            setUsersMap(prev => ({
              ...prev,
              [currentUser.id]: {...currentUser, isFollowing: true},
            }))
          },
        },
      )
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
