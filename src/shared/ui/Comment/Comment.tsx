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
import { IconButton } from '../IconButton/IconButton'
import { useAddLikeAnswerMutation } from '@/shared/api/useAddLikeAnswerMutation'

type Props = {
  createdAt: string
  ownerId: number
  avatarOwner: string | null
  userName: string
  comment: string
  likeCount: number
  postId: number
  commentId?: number
  isLikedByUser: boolean
  isPostDescription?: boolean
}

export const Comment = (props: Props) => {
  const {
    createdAt,
    ownerId,
    avatarOwner,
    userName,
    comment,
    likeCount,
    postId,
    commentId,
    isLikedByUser,
    isPostDescription = false
  } = props

  const { user } = useAuth()
  const [isAnswering, setIsAnswering] = useState(false)
 
  const { data: answercomments } = useAnswerCommentsQuery(postId, commentId)
  const { mutate: addLike } = useAddLikeAnswerMutation()

  if (!ownerId) {
    return <span>loading</span>
  }

  const { popModal } = useModal()

  const handleUserNameClick = () => {
    popModal()
  }

  const dateTime = getTimeAgo(createdAt)

  const handleAnswer = () => {
    setIsAnswering(!isAnswering)
  }

  const handleLikes = () => {
    if (!commentId) return 
    const newLikeStatus = isLikedByUser ? 'NONE' : 'LIKE'

    addLike(
      {
        postId,
        commentId,
        likeStatus: newLikeStatus,
      },
      {
        onSuccess: () => {
          console.log('Like status updated successfully')
        },
        onError: (error) => {
          console.error('Failed to update like status:', error)
        }
      }
    )
  }

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
        <div className={styles.textWithLike}>
          <div>
            <Link href={PATH.PROFILE + `/${ownerId}`} onClick={() => handleUserNameClick()}>
              <span className={styles.link}>{userName}</span>
            </Link>
            <span className={styles.comment}>{comment}</span>
          </div>
          {!isPostDescription&&<IconButton iconId={isLikedByUser ? 'unlikeComment' : 'likeComment'} onClick={handleLikes} size={16}/>}
        </div>
        <div className={styles.commentInfo}>
          <div className={styles.time}>{dateTime}</div>
          {!isPostDescription&&likeCount !== 0 && <div className={styles.time}>Like: {likeCount}</div>}
          {commentId && ownerId !== user?.userId && (
            <button onClick={handleAnswer} className={styles.answer}>
              Answer
            </button>
          )}
        </div>
        <div className={styles.createComment}>
          {isAnswering && (
            <CreateComment
              postId={postId}
              variant={'answer'}
              commentId={commentId}
              onClick={handleAnswer}
            />
          )}
        </div>
        {commentId && answercomments && <CommentsInfinity comments={answercomments} />}
      </div>
    </div>
  )
}
