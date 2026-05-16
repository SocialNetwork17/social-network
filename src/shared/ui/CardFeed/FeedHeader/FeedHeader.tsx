'use client'

import styles from './FeedHeader.module.scss'
import { SchemaPostViewModel } from '@/shared/api/schema'
import { getTimeAgo } from '@/shared/utils/getTimeAgo'
import { useState } from 'react'
import { UserName } from '../../UserName/UserName'
import { Icon } from '../../Icon/Icon'
import { IconButton } from '../../IconButton/IconButton'
import { ThreeDotsMenu } from '@/features/post/viewPost/ui/ImageModalHeader/ThreeDotsMenu/ThreeDotsMenu'

type Props = {
  postItem: SchemaPostViewModel
}

export const FeedHeader = ({ postItem}: Props) => {
  const [isChecked, setIsChecked] = useState(false)

  const dateTime = getTimeAgo(postItem.createdAt)

  const toggleMenu = () => {
    setIsChecked(!isChecked)
  }

  return (
    <div className={styles.container}>
      <div className={styles.first}>
        <UserName post={postItem} />
        <Icon iconId="dot" size={4} viewBox="0 0 4 4" />
        <div className={styles.time}>{dateTime}</div>
      </div>
      <IconButton onClick={toggleMenu} iconId="threeDots" size={24} viewBox="0 0 24 24" />
      {/* <ThreeDotsMenu postId={postItem.id} setViewMode={setViewMode}/> */}
    </div>
  )
}
