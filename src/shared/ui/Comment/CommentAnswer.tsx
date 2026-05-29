'use client'

import styles from './Comment.module.scss'
import { Card } from '../Card/Card'
import { getTimeAgo } from '@/shared/utils/getTimeAgo'
import Link from 'next/link'
import { PATH } from '@/shared/constants/routings'
import { useModal } from '@/widgets/modal/model/modal.context'
import { useAuth } from '@/shared/hooks/useAuth'
import { useState } from 'react'
import { CreateComment } from '../CardFeed/CreateComment/CreateComment'
import { CommentsInfinity } from '../CommentsBlock/CommentsInfinity/CommentsInfinity'
import { useAnswerCommentsQuery } from '@/shared/api/useAnswerCommentsQuery'

type Props = {
  createdAt: string
  ownerId: number
  avatarOwner: string | null
  userName: string
  comment: string
  likeCount: number
}

export const CommentAnswer = (props: Props) => {
  const {
    createdAt,
    ownerId,
    avatarOwner,
    userName,
    comment,
    likeCount,
  } = props


  if (!ownerId) {
    return <span>loading</span>
  }

  const { popModal } = useModal()

  const handleUserNameClick = () => {
    popModal()
  }

  const dateTime = getTimeAgo(createdAt)

  return (
    <div className={styles.container}>
      <Link
        href={PATH.PROFILE + `/${ownerId}`}
        className={styles.image}
        onClick={() => handleUserNameClick()}
      >
        {avatarOwner ? (
          <Card images={avatarOwner} width={36} height={36} variant="circular" />
        ) : (
          <div className={styles.avatarPlaceholder}>
            {(userName?.charAt(0) || 'U').toUpperCase()}
          </div>
        )}
      </Link>
      <div className={styles.commentFull}>
        <div>
          <Link href={PATH.PROFILE + `/${ownerId}`} onClick={() => handleUserNameClick()}>
            <span className={styles.link}>{userName}</span>
          </Link>
          <span className={styles.comment}>{comment}</span>
        </div>
        <div className={styles.commentInfo}>
          <div className={styles.time}>{dateTime}</div>
          {likeCount !== 0 && <div className={styles.time}>Like: {likeCount}</div>}
        </div>
      </div>
    </div>
  )
}
