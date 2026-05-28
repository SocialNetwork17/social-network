import {Card} from '../Card/Card'
import styles from './ProfileHeader.module.scss'
import {Skeleton} from '../Skeleton/Skeleton'
import {
  SchemaProfileViewModel,
  SchemaPublicProfileViewModel,
  SchemaUserFollowingFollowersViewModel,
} from '@/shared/api/schema'
import {Button} from "@/shared/ui/Button/Button";
import {useRouter} from "next/navigation";
import {PATH} from "@/shared/constants/routings";
import {SettingsTabs} from "@/pages/settings/model/tabs.types";
import {useEffect, useMemo, useRef, useState} from "react";
import {useFollowUserMutation} from "@/shared/api/useFollowUserMutation";
import {useUnfollowUserMutation} from "@/shared/api/useUnfollowUserMutation";
import {Spinner} from "@/shared/ui/Spinner/Spinner";
import {useFollowersQuery} from '@/shared/api/useFollowersQuery'
import {useFollowingQuery} from '@/shared/api/useFollowingQuery'
import {Icon} from '@/shared/ui/Icon/Icon'

type Props = {
  user: SchemaProfileViewModel | SchemaPublicProfileViewModel
  type: 'profile' | 'friend' | 'user' | 'unauthorized'
  publicationCount: number
}

export const ProfileHeader = ({user, type, publicationCount}: Props) => {
  const PAGE_TYPE_TITLE: Record<'followers' | 'following', string> = {
    followers: 'Followers',
    following: 'Following',
  }

  const router = useRouter()
  const followMutation = useFollowUserMutation()
  const unfollowMutation = useUnfollowUserMutation()
  const [modalType, setModalType] = useState<'followers' | 'following' | null>(null)
  const [usersMap, setUsersMap] = useState<Record<number, SchemaUserFollowingFollowersViewModel>>({})
  const [pendingActionUserId, setPendingActionUserId] = useState<number | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

  const userName = user.userName

  const [isFollowing, setIsFollowing] = useState<boolean>(!!('isFollowing' in user && user.isFollowing))
  const [followersCount, setFollowersCount] = useState<number>(
    'userMetadata' in user ? user.userMetadata.followers : 0,
  )
  const [followingCount, setFollowingCount] = useState<number>(
    'userMetadata' in user ? user.userMetadata.following : 0,
  )

  const isLoadingFollowAction = followMutation.isPending || unfollowMutation.isPending

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

    if (modalType === 'following') {
      return followingData?.pages.flatMap(page => page.items ?? []) ?? []
    }

    return []
  }, [followersData, followingData, modalType])

  const isModalLoading = modalType === 'followers' ? isFollowersLoading : isFollowingLoading
  const isFetchingNextPage = modalType === 'followers' ? isFetchingNextFollowers : isFetchingNextFollowing
  const hasNextPage = modalType === 'followers' ? hasNextFollowers : hasNextFollowing

  useEffect(() => {
    if (!modalType) {
      return
    }

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
  }, [modalUsers, modalType])

  useEffect(() => {
    const target = loadMoreRef.current
    const container = scrollContainerRef.current

    if (!target || !modalType || !hasNextPage) {
      return
    }

    const observer = new IntersectionObserver(entries => {
      if (!entries[0]?.isIntersecting || isFetchingNextPage) {
        return
      }

      if (modalType === 'followers') {
        fetchNextFollowers()

        return
      }

      if (modalType === 'following') {
        fetchNextFollowing()
      }
    }, {threshold: 0.5, root: container})

    observer.observe(target)

    return () => observer.disconnect()
  }, [
    fetchNextFollowers,
    fetchNextFollowing,
    hasNextPage,
    isFetchingNextPage,
    modalType,
  ])


  const onclickHandler = () => {
    router.push(`${PATH.SETTINGS}?part=${SettingsTabs.INFO}`)
  }

  const onSendMessageHandler = () => {
    const query = new URLSearchParams({
      userId: String(user.id),
      username: user.userName,
    })

    router.push(`${PATH.MESSENGER}?${query.toString()}`)
  }

  const onFollowToggle = async () => {
    if (!(type === 'user' || type === 'friend')) {
      return
    }

    if (isFollowing) {
      await unfollowMutation.mutateAsync({userId: user.id})
      setIsFollowing(false)
      setFollowersCount(prev => Math.max(prev - 1, 0))

      return
    }

    await followMutation.mutateAsync({selectedUserId: user.id})
    setIsFollowing(true)
    setFollowersCount(prev => prev + 1)
  }

  useEffect(() => {
    document.body.style.overflow = modalType ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [modalType])

  const closeModal = () => {
    setModalType(null)
  }

  const openFollowersModal = () => {
    if (type !== 'profile') {
      return
    }

    setModalType('followers')
  }

  const openFollowingModal = () => {
    if (type !== 'profile') {
      return
    }

    setModalType('following')
  }

  const onToggleFollowInModal = async (listUser: SchemaUserFollowingFollowersViewModel) => {
    const currentUser = usersMap[listUser.id] ?? listUser

    setPendingActionUserId(currentUser.id)

    try {
      if (currentUser.isFollowing) {
        await unfollowMutation.mutateAsync({userId: currentUser.id})
        setUsersMap(prev => ({
          ...prev,
          [currentUser.id]: {
            ...currentUser,
            isFollowing: false,
          },
        }))
        setFollowingCount(prev => Math.max(prev - 1, 0))

        return
      }

      await followMutation.mutateAsync({selectedUserId: currentUser.id})
      setUsersMap(prev => ({
        ...prev,
        [currentUser.id]: {
          ...currentUser,
          isFollowing: true,
        },
      }))
      setFollowingCount(prev => prev + 1)
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

  return (
    <div className={styles.profileContainer}>
      {!user?.avatars.length && <Skeleton width={192} height={192} borderRadius={96} />}
      {user?.avatars[0]?.url && <Card images={user.avatars[0]?.url} variant="circular"/>}
      <div className={styles.info}>
        <div>
          <h2 style={{ display: 'inline-block' }}>{user?.userName}</h2>
          {type === 'profile' && (
            <div>
              <Button variant={'secondary'}
                      disabled={false}
                      width={167}
                      height={36}
                      onClick={onclickHandler}
              >
                Profile Settings
              </Button>
            </div>
          )}
          {type === 'friend' && (
            <div>
              <Button
                  variant={isFollowing ? 'outline' : 'primary'}
                  disabled={isLoadingFollowAction}
                  width={167}
                  height={36}
                  onClick={onFollowToggle}
              >
                {isLoadingFollowAction ? <Spinner/> : (isFollowing ? 'Unfollow' : 'Follow')}
              </Button>
              <Button variant={'secondary'} disabled={false} width={167} height={36} onClick={onSendMessageHandler}>
                Send Message
              </Button>
            </div>
          )}
          {type === 'user' && (
            <div>
              <Button
                  variant={isFollowing ? 'outline' : 'primary'}
                  disabled={isLoadingFollowAction}
                  width={167}
                  height={36}
                  onClick={onFollowToggle}
              >
                {isLoadingFollowAction ? <Spinner/> : (isFollowing ? 'Unfollow' : 'Follow')}
              </Button>
              <Button variant={'secondary'} disabled={false} width={167} height={36} onClick={onSendMessageHandler}>
                Send Message
              </Button>
            </div>
          )}
        </div>
        <div>
          <button
            className={`${styles.statsItem} ${type === 'profile' ? styles.clickableStatsItem : ''}`}
            disabled={type !== 'profile'}
            onClick={openFollowingModal}
          >
            <div>{followingCount}</div>
            <span>Following</span>
          </button>
          <button
            className={`${styles.statsItem} ${type === 'profile' ? styles.clickableStatsItem : ''}`}
            disabled={type !== 'profile'}
            onClick={openFollowersModal}
          >
            <div>{followersCount}</div>
            <span>Followers</span>
          </button>
          <div>
            <div>{publicationCount || 0}</div>
            <span>Publications</span>
          </div>
        </div>
      </div>
      {modalType && (
        <div className={styles.overlay} onClick={closeModal}>
          <div className={styles.modal} onClick={event => event.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>{PAGE_TYPE_TITLE[modalType] === 'Followers' ? followersCount : followingCount} {PAGE_TYPE_TITLE[modalType]}</h3>
              <button className={styles.closeButton} onClick={closeModal}>×</button>
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
      )}
    </div>
  )
}
