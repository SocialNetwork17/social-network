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
      <div className={styles.avatars}>
        {avatarWhoLikes.slice(0, 3).map((avatar, index) => (
          <div
            key={index}
            className={styles.avatarWrapper}
            style={{ zIndex: 3 - index }} // чтобы первый был сверху
          >
            <Card images={avatar} width={24} height={24} variant="circular" />
          </div>
        ))}
      </div>
        <span>
          {likesCount} {likesCount === 1 ? 'Like' : 'Likes'}
        </span>
    </div>
  )
}
