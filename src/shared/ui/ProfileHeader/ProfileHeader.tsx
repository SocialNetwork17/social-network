import {Card} from '../Card/Card'
import styles from './ProfileHeader.module.scss'
import {Skeleton} from '../Skeleton/Skeleton'
import {SchemaProfileViewModel, SchemaPublicProfileViewModel} from '@/shared/api/schema'
import {Button} from '@/shared/ui/Button/Button'
import {Spinner} from '@/shared/ui/Spinner/Spinner'
import {FollowersFollowingModal} from '@/widgets/modal/ui/baseModal/FollowersFollowingModal/FollowersFollowingModal'
import {useProfileHeader} from './hook/useProfileHeader'

type Props = {
  user: SchemaProfileViewModel | SchemaPublicProfileViewModel
  type: 'profile' | 'friend' | 'user' | 'unauthorized'
  publicationCount: number
}

export const ProfileHeader = ({user, type, publicationCount}: Props) => {
  const {
    isFollowing,
    followersCount,
    followingCount,
    isLoadingFollowAction,
    modalType,
    onClickSettingsHandler,
    onSendMessageHandler,
    onFollowToggle,
    closeModal,
    openFollowersModal,
    openFollowingModal,
    setFollowingCount,
  } = useProfileHeader({user, type})

  return (
    <div className={styles.profileContainer}>
      {!user?.avatars.length && <Skeleton width={192} height={192} borderRadius={96} />}
      {user?.avatars[0]?.url && <Card images={user.avatars[0]?.url} variant="circular" />}
      <div className={styles.info}>
        <div>
          <h2 style={{display: 'inline-block'}}>{user?.userName}</h2>
          {type === 'profile' && (
            <div>
              <Button variant={'secondary'} disabled={false} width={167} height={36} onClick={onClickSettingsHandler}>
                Profile Settings
              </Button>
            </div>
          )}
          {(type === 'friend' || type === 'user') && (
            <div>
              <Button
                variant={isFollowing ? 'outline' : 'primary'}
                disabled={isLoadingFollowAction}
                width={167}
                height={36}
                onClick={onFollowToggle}
              >
                {isLoadingFollowAction ? <Spinner /> : isFollowing ? 'Unfollow' : 'Follow'}
              </Button>
              <Button variant={'secondary'} disabled={false} width={167} height={36} onClick={onSendMessageHandler}>
                Send Message
              </Button>
            </div>
          )}
        </div>
        <div>
          <Button
              className={`${styles.statsItem} ${type === 'profile' ? styles.clickableStatsItem : ''}`}
              variant={'textButton'}
              disabled={type !== 'profile'}
              onClick={openFollowingModal}
          >
            <div>{followingCount}</div>
            <span>Following</span>
          </Button>
          <Button
              className={`${styles.statsItem} ${type === 'profile' ? styles.clickableStatsItem : ''}`}
              variant={'textButton'}
              disabled={type !== 'profile'}
              onClick={openFollowersModal}
          >
            <div>{followersCount}</div>
            <span>Followers</span>
          </Button>
          <div>
            <div>{publicationCount || 0}</div>
            <span>Publications</span>
          </div>
        </div>
      </div>
      {modalType && (
        <FollowersFollowingModal
          modalType={modalType}
          userName={user.userName}
          followersCount={followersCount}
          followingCount={followingCount}
          onClose={closeModal}
          onFollowingCountChange={setFollowingCount}
        />
      )}
    </div>
  )
}
