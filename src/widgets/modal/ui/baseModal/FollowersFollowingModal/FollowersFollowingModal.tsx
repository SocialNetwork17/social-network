import styles from './FollowersFollowingModal.module.scss'
import {useFollowersFollowingModal} from '../../../../../shared/hooks/useFollowersFollowingModal'
import {Button} from '@/shared/ui/Button/Button'
import {Icon} from '@/shared/ui/Icon/Icon'
import {Spinner} from '@/shared/ui/Spinner/Spinner'

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
  const {
    usersMap,
    pendingActionUserId,
    loadMoreRef,
    scrollContainerRef,
    modalUsers,
    isModalLoading,
    isFetchingNextPage,
    onToggleFollowInModal,
    getButtonText,
  } = useFollowersFollowingModal({modalType, userName, onFollowingCountChange})

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
