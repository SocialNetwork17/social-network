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
    isLikedByUser = false,
  } = props

  const { user } = useAuth()
  const [isAnswering, setIsAnswering] = useState(false)
   const [localLikeCount, setLocalLikeCount] = useState(likeCount)
  const [localIsLiked, setLocalIsLiked] = useState(isLikedByUser)

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
    if (!commentId) return // Добавьте эту проверку

     // Определяем новый статус лайка
    const newLikeStatus = localIsLiked ? 'NONE' : 'LIKE'
    
    // Оптимистичное обновление UI
    setLocalIsLiked(!localIsLiked)
    setLocalLikeCount(prev => localIsLiked ? prev - 1 : prev + 1)

    addLike(
      {
        postId,
        commentId, // Теперь точно есть
        likeStatus: newLikeStatus,
      },
      {
        onSuccess: () => {
          // Успешно - состояние уже обновлено оптимистично
          console.log('Like status updated successfully')
        },
        onError: (error) => {
          // Откатываем изменения при ошибке
          setLocalIsLiked(localIsLiked)
          setLocalLikeCount(likeCount)
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
          <IconButton iconId={localIsLiked ? 'unlikeComment' : 'likeComment'} onClick={handleLikes} />
        </div>
        <div className={styles.commentInfo}>
          <div className={styles.time}>{dateTime}</div>
          {likeCount !== 0 && <div className={styles.time}>Like: {likeCount}</div>}
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
