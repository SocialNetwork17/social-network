'use client'
import styles from './CommentsBlock.module.scss'
import { Button } from '../Button/Button'
import { useCommentsQuery } from '@/shared/api/useCommentsQuery'
import { useState } from 'react'
import { CommentsInfinity } from './CommentsInfinity/CommentsInfinity'

type Props = {
  postId: number
}

export const CommentsBlock = ({ postId }: Props) => {
  const { data: comments } = useCommentsQuery(postId)

  const [isOpenedComment, setIsOpenedComment] = useState(false)

  const handleOpenComment = (status: boolean) => setIsOpenedComment(!status)

  const commentCount = comments?.totalCount || 0

  return (
    <div className={styles.container}>
      <Button
        variant="underline"
        onClick={() => handleOpenComment(isOpenedComment)}
        disabled={false}
      >
        {isOpenedComment
          ? `Hide All Comments (${commentCount})`
          : `View All Comments (${commentCount})`}
      </Button>

      {isOpenedComment && comments?.items && (
        <CommentsInfinity comments={comments?.items} customStyle={{ maxHeight: "180px" }} postId={postId}/> 
      )}
    </div>
  )
}
