import {Card} from '../Card/Card'
import styles from './ProfileHeader.module.scss'
import {Skeleton} from '../Skeleton/Skeleton'
import {
  SchemaProfileViewModel,
  SchemaPublicProfileViewModel,
} from '@/shared/api/schema'
import {Button} from "@/shared/ui/Button/Button";
import {useRouter} from "next/navigation";
import {PATH} from "@/shared/constants/routings";
import {SettingsTabs} from "@/pages/settings/model/tabs.types";
import {useState} from "react";
import {useFollowUserMutation} from "@/shared/api/useFollowUserMutation";
import {useUnfollowUserMutation} from "@/shared/api/useUnfollowUserMutation";
import {Spinner} from "@/shared/ui/Spinner/Spinner";
import {FollowersFollowingModal} from '@/widgets/modal/ui/baseModal/FollowersFollowingModal/FollowersFollowingModal'

type Props = {
  user: SchemaProfileViewModel | SchemaPublicProfileViewModel
  type: 'profile' | 'friend' | 'user' | 'unauthorized'
  publicationCount: number
}

export const ProfileHeader = ({user, type, publicationCount}: Props) => {
  const router = useRouter()
  const followMutation = useFollowUserMutation()
  const unfollowMutation = useUnfollowUserMutation()
  const [modalType, setModalType] = useState<'followers' | 'following' | null>(null)

  const userName = user.userName

  const [isFollowing, setIsFollowing] = useState<boolean>(!!('isFollowing' in user && user.isFollowing))
  const [followersCount, setFollowersCount] = useState<number>(
    'userMetadata' in user ? user.userMetadata.followers : 0,
  )
  const [followingCount, setFollowingCount] = useState<number>(
    'userMetadata' in user ? user.userMetadata.following : 0,
  )

  const isLoadingFollowAction = followMutation.isPending || unfollowMutation.isPending

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
        <FollowersFollowingModal
          modalType={modalType}
          userName={userName}
          followersCount={followersCount}
          followingCount={followingCount}
          onClose={closeModal}
          onFollowingCountChange={setFollowingCount}
        />
      )}
    </div>
  )
}
