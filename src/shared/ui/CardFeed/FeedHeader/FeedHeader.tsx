'use client'

import styles from './FeedHeader.module.scss'
import { SchemaPostViewModel } from '@/shared/api/schema'
import { getTimeAgo } from '@/shared/utils/getTimeAgo'
import { useState } from 'react'
import { UserName } from '../../UserName/UserName'
import { Icon } from '../../Icon/Icon'
import { IconButton } from '../../IconButton/IconButton'
import {FeedModal} from "@/shared/ui/CardFeed/FeedModal/FeedModal";

type Props = {
  postItem: SchemaPostViewModel
}

export const FeedHeader = ({ postItem }: Props) => {
  const [isModalOpened, setIsModalOpened] = useState(false)

  const dateTime = getTimeAgo(postItem.createdAt)

  const toggleMenu = () => {
    setIsModalOpened(!isModalOpened)
  }

  const modalStateHandler = (isOpened: boolean) => {
    setIsModalOpened(isOpened)
  }

  return (
    <div className={styles.container}>
      <div className={styles.first}>
        <UserName post={postItem} />
        <Icon iconId="dot" size={4} viewBox="0 0 4 4" />
        <div className={styles.time}>{dateTime}</div>
      </div>
      <div className={styles.menuWrapper}>
        <IconButton onClick={toggleMenu} iconId="threeDots" size={24} viewBox="0 0 24 24" />
        {isModalOpened && (
          <FeedModal postItem={postItem} toggleMenu={modalStateHandler} isModalOpened={isModalOpened}/>
        )}
      </div>
    </div>
  )
}
