'use client'

import styles from './CreateComment.module.scss'
import { useState } from 'react'
import { TextArea } from '../../TextArea/TextArea'
import { Button } from '../../Button/Button'
import { useCreateCommentMutation } from '@/shared/api/useCreateCommentMutation'
import { useCreateAnswerCommentMutation } from '@/shared/api/useCreateAnswerCommentMutation'

type Props = {
  postId: number
  variant: 'new comment' | 'answer'
  commentId?: number
}

export const CreateComment = ({ postId, variant, commentId }: Props) => {
  const [value, setValue] = useState('')

  const { mutate: createComment, isPending: isPendingCreate } = useCreateCommentMutation()
  const { mutate: answerComment, isPending: isPendingAnswer } = useCreateAnswerCommentMutation()

  const handleSubmit = () => {
    if (!value.trim()) return

    if (variant === 'new comment') {
      createComment(
        {
          postId,
          content: value,
        },
        {
          onSuccess: () => {
            setValue('')
          },
        }
      )
    } else {
      if (!commentId) return

      answerComment(
        {
          postId,
          commentId,
          content: value,
        },
        {
          onSuccess: () => {
            setValue('')
          },
        }
      )
    }
  }

  const isPending = variant === 'new comment' ? isPendingCreate : isPendingAnswer

  return (
    <div className={styles.publish}>
      <TextArea
        label={''}
        value={value}
        onChange={setValue}
        placeholder={variant === 'new comment' ? 'Add a Comment...' : 'Add an answer...'}
        showCounter={false}
        variant={'simple'}
        maxLength={300}
      />
      {value && (
        <Button variant="textButton" onClick={handleSubmit} disabled={isPending}>
          {isPending ? 'Publishing...' : variant === 'new comment' ? 'Publish' : 'Answer'}
        </Button>
      )}
    </div>
  )
}
