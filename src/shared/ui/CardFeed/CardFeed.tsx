'use client'

import styles from './CardFeed.module.scss'
import { Card } from '../Card/Card'
import { SchemaPostViewModel } from '@/shared/api/schema'
import { UserName } from '../UserName/UserName'
import { getTimeAgo } from '@/shared/utils/getTimeAgo'
import { Comment } from '../Comment/Comment'

type Props = {
  postItem: SchemaPostViewModel
  onClick?: () => void
}

export const CardFeed = ({ postItem, onClick }: Props) => {
  const imageSlider = postItem.images.map(image => image.url)

  const dateTime = getTimeAgo(postItem.createdAt)

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <UserName post={postItem} />
        <div className={styles.time}>{dateTime}</div>
      </div>
      <div className={styles.slider}>
        <Card images={imageSlider} onClick={onClick} />
      </div>
      <div>
        <Comment postinfo={postItem}/>
      </div>
    </div>
  )
}
