import {useEffect} from 'react'
import {useFollowersFollowingModalActions} from './useFollowersFollowingModalActions'
import {useFollowersFollowingModalData} from './useFollowersFollowingModalData'
import {useFollowersFollowingModalInfiniteScroll} from './useFollowersFollowingModalInfiniteScroll'

type Params = {
  modalType: 'followers' | 'following'
  userName: string
  onFollowingCountChange: (updater: (prev: number) => number) => void
}

export const useFollowersFollowingModal = ({modalType, userName, onFollowingCountChange}: Params) => {
  const {modalUsers, isModalLoading, isFetchingNextPage, hasNextPage, fetchNextPage} =
    useFollowersFollowingModalData({modalType, userName})
  const {loadMoreRef, scrollContainerRef} = useFollowersFollowingModalInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  })
  const {usersMap, pendingActionUserId, onToggleFollowInModal, getButtonText} =
    useFollowersFollowingModalActions({modalType, userName, onFollowingCountChange})

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [])

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
