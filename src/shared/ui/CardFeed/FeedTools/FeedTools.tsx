'use client'

import styles from './FeedTools.module.scss'
import { IconButton } from '../../IconButton/IconButton'

type Props = {
  isLiked?: boolean
  onLikeClick?: () => void
  isLikeDisabled?: boolean
}

export const FeedTools = ({ isLiked = false, onLikeClick, isLikeDisabled = false }: Props) => {
  return (
      <div className={styles.flex}>
        <div className={styles.icons}>
          <IconButton
            onClick={onLikeClick}
            iconId={isLiked ? 'likeFilled' : 'like'}
            size={24}
            viewBox="0 0 24 24"
            fill={isLiked ? 'var(--color-danger)' : undefined}
            disabled={isLikeDisabled}
          />
          <IconButton iconId="messenger" size={24} viewBox="0 0 24 24" />
          <IconButton iconId="send" size={24} viewBox="0 0 24 24" />
        </div>
        <IconButton iconId="favorites" size={24} viewBox="0 0 24 24" />
      </div>
  )
}
