import styles from './FollowersFollowingModal.module.scss'
import {SchemaUserFollowingFollowersViewModel} from '@/shared/api/schema'
import {useFollowersQuery} from '@/shared/api/useFollowersQuery'
import {useFollowingQuery} from '@/shared/api/useFollowingQuery'
import {useFollowUserMutation} from '@/shared/api/useFollowUserMutation'
import {useUnfollowUserMutation} from '@/shared/api/useUnfollowUserMutation'
import {Button} from '@/shared/ui/Button/Button'
import {Icon} from '@/shared/ui/Icon/Icon'
import {Spinner} from '@/shared/ui/Spinner/Spinner'
import {useEffect, useMemo, useRef, useState} from 'react'

const PAGE_TYPE_TITLE: Record<'followers' | 'following', string> = {
  followers: 'Followers',
  following: 'Following',
}

type Props = {
  modalType: 'followers' | 'following'
  userName: string
  followersCount: number
  followingCount: number
  onClose: () => void
  onFollowingCountChange: (updater: (prev: number) => number) => void
}

export const FollowersFollowingModal = ({
  modalType,
  userName,
  followersCount,
  followingCount,
  onClose,
  onFollowingCountChange,
}: Props) => {
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
        await unfollowMutation.mutateAsync({userId: currentUser.userId})
        setUsersMap(prev => ({
          ...prev,
          [currentUser.id]: {...currentUser, isFollowing: false},
        }))
        onFollowingCountChange(prev => Math.max(prev - 1, 0))

        return
      }

      await followMutation.mutateAsync({selectedUserId: currentUser.userId})
      setUsersMap(prev => ({
        ...prev,
        [currentUser.id]: {...currentUser, isFollowing: true},
      }))
      onFollowingCountChange(prev => prev + 1)
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

  const title = `${PAGE_TYPE_TITLE[modalType] === 'Followers' ? followersCount : followingCount} ${PAGE_TYPE_TITLE[modalType]}`

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={event => event.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>{title}</h3>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>
        <div ref={scrollContainerRef} className={styles.modalContent}>
          {isModalLoading && modalUsers.length === 0 ? (
            <div className={styles.spinner}><Spinner /></div>
          ) : (
            <>
              <ul className={styles.userList}>
                {modalUsers.map(listUser => {
                  const actualUser = usersMap[listUser.id] ?? listUser
                  const avatarUrl = actualUser.avatars?.[0]?.url
                  const isActionLoading = pendingActionUserId === actualUser.id

                  return (
                    <li key={actualUser.id} className={styles.userItem}>
                      <div className={styles.userInfo}>
                        {avatarUrl ? (
                          <img src={avatarUrl} alt={actualUser.userName} className={styles.avatar} />
                        ) : (
                          <Icon iconId={'default-avatar'} size={40} viewBox={'0 0 62 62'} />
                        )}
                        <span>{actualUser.userName}</span>
                      </div>
                      <Button
                        variant={actualUser.isFollowing ? 'outline' : 'primary'}
                        disabled={isActionLoading}
                        width={120}
                        height={30}
                        onClick={() => onToggleFollowInModal(actualUser)}
                      >
                        {isActionLoading ? <Spinner /> : getButtonText(actualUser)}
                      </Button>
                    </li>
                  )
                })}
              </ul>
              {modalUsers.length === 0 && <div className={styles.emptyState}>No users found</div>}
              <div ref={loadMoreRef} className={styles.loadMoreTrigger} />
            </>
          )}
        </div>
        {isFetchingNextPage && (
          <div className={styles.spinner}><Spinner /></div>
        )}
      </div>
    </div>
  )
}
