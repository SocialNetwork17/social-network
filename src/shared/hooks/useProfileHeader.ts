import {SchemaProfileViewModel, SchemaPublicProfileViewModel} from '@/shared/api/schema'
import {useFollowUserMutation} from '@/shared/api/useFollowUserMutation'
import {useUnfollowUserMutation} from '@/shared/api/useUnfollowUserMutation'
import {PATH} from '@/shared/constants/routings'
import {SettingsTabs} from '@/pages/settings/model/tabs.types'
import {useRouter} from 'next/navigation'
import {useState} from 'react'

type Params = {
  user: SchemaProfileViewModel | SchemaPublicProfileViewModel
  type: 'profile' | 'friend' | 'user' | 'unauthorized'
}

export const useProfileHeader = ({user, type}: Params) => {
  const router = useRouter()
  const followMutation = useFollowUserMutation()
  const unfollowMutation = useUnfollowUserMutation()
  const [modalType, setModalType] = useState<'followers' | 'following' | null>(null)

  const [isFollowing, setIsFollowing] = useState<boolean>(!!('isFollowing' in user && user.isFollowing))
  const [followersCount, setFollowersCount] = useState<number>(
    'userMetadata' in user ? user.userMetadata.followers : 0,
  )
  const [followingCount, setFollowingCount] = useState<number>(
    'userMetadata' in user ? user.userMetadata.following : 0,
  )

  const isLoadingFollowAction = followMutation.isPending || unfollowMutation.isPending

  const onClickSettingsHandler = () => {
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

  const closeModal = () => setModalType(null)

  const openFollowersModal = () => {
    if (type !== 'profile') return
    setModalType('followers')
  }

  const openFollowingModal = () => {
    if (type !== 'profile') return
    setModalType('following')
  }

  return {
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
  }
}
