import {SchemaUserFollowingFollowersViewModel} from '@/shared/api/schema'
import {useFollowUserMutation} from '@/shared/api/useFollowUserMutation'
import {useUnfollowUserMutation} from '@/shared/api/useUnfollowUserMutation'
import {useQueryClient} from '@tanstack/react-query'
import {useState} from 'react'

type Params = {
  modalType: 'followers' | 'following'
  userName: string
  onFollowingCountChange: (updater: (prev: number) => number) => void
}

type Result = {
  usersMap: Record<number, SchemaUserFollowingFollowersViewModel>
  pendingActionUserId: number | null
  onToggleFollowInModal: (listUser: SchemaUserFollowingFollowersViewModel) => Promise<void>
  getButtonText: (listUser: SchemaUserFollowingFollowersViewModel) => string
}

export const useFollowersFollowingModalActions = ({
  modalType,
  userName,
  onFollowingCountChange,
}: Params): Result => {
  const [usersMap, setUsersMap] = useState<Record<number, SchemaUserFollowingFollowersViewModel>>({})
  const [pendingActionUserId, setPendingActionUserId] = useState<number | null>(null)

  const queryClient = useQueryClient()
  const followMutation = useFollowUserMutation()
  const unfollowMutation = useUnfollowUserMutation()

  const onToggleFollowInModal = async (listUser: SchemaUserFollowingFollowersViewModel) => {
    const currentUser = usersMap[listUser.id] ?? listUser
    const previousUser = currentUser
    const optimisticUser = {...previousUser, isFollowing: !previousUser.isFollowing}

    setPendingActionUserId(currentUser.id)
    setUsersMap(prev => ({
      ...prev,
      [currentUser.id]: optimisticUser,
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
          },
        )

        onFollowingCountChange(prev => Math.max(prev - 1, 0))

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
          },
        )
      }
    } catch (error) {
      setUsersMap(prev => ({
        ...prev,
        [currentUser.id]: previousUser,
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
    onToggleFollowInModal,
    getButtonText,
  }
}
