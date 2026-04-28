'use client'

import styles from './CardFeed.module.scss'
import { Card } from '../Card/Card'
import { SchemaPostViewModel } from '@/shared/api/schema'
import { UserName } from '../UserName/UserName'
import { getTimeAgo } from '@/shared/utils/getTimeAgo'
import { Comment } from '../Comment/Comment'
import { ThreeDotsMenu } from '@/features/post/viewPost/ui/ImageModalHeader/ThreeDotsMenu/ThreeDotsMenu'
import { IconButton } from '../IconButton/IconButton'
import { useState } from 'react'

type Props = {
  postItem: SchemaPostViewModel
  onClick?: () => void
}

export const CardFeed = ({ postItem, onClick }: Props) => {
  const [isChecked, setIsChecked] = useState(false)

  const imageSlider = postItem.images.map(image => image.url)

  const dateTime = getTimeAgo(postItem.createdAt)

  const toggleMenu = () => {
    setIsChecked(!isChecked)
  }

  return (
    <div className={styles.container}>
      <div className={styles.flex}>
        <div className={styles.first}>
          <UserName post={postItem} />
          <div className={styles.time}>{dateTime}</div>
        </div>
        <IconButton onClick={toggleMenu} iconId="threeDots" size={24} viewBox="0 0 24 24" />
        {/* <ThreeDotsMenu postId={postItem.id} setViewMode={setViewMode}/> */}
      </div>
      <div className={styles.slider}>
        <Card images={imageSlider} onClick={onClick} />
      </div>
      <div className={styles.flex}>
        <div className={styles.icons}>
          <IconButton onClick={toggleMenu} iconId="like" size={24} viewBox="0 0 24 24" />
          <IconButton onClick={toggleMenu} iconId="messenger" size={24} viewBox="0 0 24 24" />
          <IconButton onClick={toggleMenu} iconId="send" size={24} viewBox="0 0 24 24" />
        </div>
        <IconButton onClick={toggleMenu} iconId="favorites" size={24} viewBox="0 0 24 24" />
      </div>
      <Comment postinfo={postItem} />
    </div>
  )
}
