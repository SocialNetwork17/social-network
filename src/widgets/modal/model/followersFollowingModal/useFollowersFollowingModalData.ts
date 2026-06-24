import {SchemaUserFollowingFollowersViewModel} from '@/shared/api/schema'
import {useFollowersQuery} from '@/shared/api/useFollowersQuery'
import {useFollowingQuery} from '@/shared/api/useFollowingQuery'
import {useMemo} from 'react'

type Params = {
  modalType: 'followers' | 'following'
  userName: string
}

type Result = {
  modalUsers: SchemaUserFollowingFollowersViewModel[]
  isModalLoading: boolean
  isFetchingNextPage: boolean
  hasNextPage: boolean
  fetchNextPage: () => void
}

export const useFollowersFollowingModalData = ({modalType, userName}: Params): Result => {
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
  console.log("modalUsers: ", modalUsers)

  const fetchNextPage = () => {
    if (modalType === 'followers') {
      void fetchNextFollowers()

      return
    }

    void fetchNextFollowing()
  }

  return {
    modalUsers,
    isModalLoading: modalType === 'followers' ? isFollowersLoading : isFollowingLoading,
    isFetchingNextPage: modalType === 'followers' ? isFetchingNextFollowers : isFetchingNextFollowing,
    hasNextPage: modalType === 'followers' ? hasNextFollowers : hasNextFollowing,
    fetchNextPage,
  }
}
