'use client'

import styles from '@/shared/ui/CardFeed/FeedModal/FeedModal.module.scss'
import {Icon} from '@/shared/ui/Icon/Icon'
import {useUnfollowUserMutation} from '@/shared/api/useUnfollowUserMutation'
import {SchemaPostViewModel} from '@/shared/api/schema'
import {useClickOutside} from '@/shared/hooks/useClickOutside'
import {useRef} from 'react'
import {useProfileCounts} from '@/entites/profile/model/profileCounts.context'
import {useQueryClient} from "@tanstack/react-query";

type FeedModalProps = {
    postItem: SchemaPostViewModel
    toggleMenu: (isOpened: boolean) => void
    isModalOpened: boolean
}

export const FeedModal = ({postItem, toggleMenu, isModalOpened}: FeedModalProps) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const unfollowMutation = useUnfollowUserMutation()
  const { setFollowingCount } = useProfileCounts()
    const queryClient = useQueryClient()

  const onUnfollow = async () => {
      await unfollowMutation.mutateAsync({userId: postItem.ownerId}, {
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['following', postItem.userName]})
        },
      onError: (error) => {
        console.error('Error unfollowing user:', error)
      },
    })
    setFollowingCount(prev => Math.max(prev - 1, 0))
    toggleMenu(false)
  }

  const onCopyLink = async () => {
    const postUrl = new URL(window.location.href)
    postUrl.searchParams.set('postId', String(postItem.id))

    await navigator.clipboard.writeText(postUrl.toString())
    toggleMenu(false)
  }

  useClickOutside(menuRef, () => {
    if (isModalOpened) toggleMenu(false)
  })

  return (
    <div className={styles.menu} ref={menuRef}>
      <button type="button" className={styles.menuItem} onClick={onUnfollow}>
        <Icon iconId="person-remove" size={24} viewBox="0 0 24 24" />
        <span>Unfollow</span>
      </button>
      <button type="button" className={styles.menuItem} onClick={onCopyLink}>
        <Icon iconId="copy-outline" size={24} viewBox="0 0 24 24" />
        <span>Copy Link</span>
      </button>
    </div>
  )
}
