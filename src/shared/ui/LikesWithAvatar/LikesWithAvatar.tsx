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
        avatarWhoLikes.slice(0, 3).map((avatar, index) => (
          <div key={index}>
            <Card images={avatar} width={24} height={24} variant="circular" />
          </div>
        ))}
      {likesCount > 3 && <span>+{likesCount - 3}</span>}
      <span>{likesCount} "Like"</span>
    </div>
  )
}
