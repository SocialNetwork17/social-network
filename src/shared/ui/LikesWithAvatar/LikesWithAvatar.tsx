'use client'

import styles from './LikesWithAvatar.module.scss'
import { Card } from '../Card/Card'

type Props = {
  avatarWhoLikes: string[]
  likesCount: number
}

export const LikesWithAvatar = (props: Props) => {
  const { avatarWhoLikes, likesCount } = props

  return (
    <div className={styles.container}>
      {avatarWhoLikes &&
        avatarWhoLikes.map(item => {
          return <Card images={item} width={24} height={24} variant="circular" />
        })}
      <span>{likesCount} "Like"</span>
    </div>
  )
}
