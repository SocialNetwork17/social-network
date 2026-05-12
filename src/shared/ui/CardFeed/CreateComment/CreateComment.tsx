'use client'

import styles from './CreateComment.module.scss'
import { useState } from 'react'
import { TextArea } from '../../TextArea/TextArea'
import { Button } from '../../Button/Button'
import { useCreateCommentMutation } from '@/shared/api/useCreateCommentMutation'

type Props = {
  postId: number
}

export const CreateComment = ({ postId }: Props) => {
  const [value, setValue] = useState('')

  const { mutate: createComment, isPending } = useCreateCommentMutation()

  const handleSubmit = () => {
    if (!value.trim()) return

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
  }

  return (
    <div className={styles.publish}>
      <TextArea
        label={''}
        value={value}
        onChange={setValue}
        placeholder={'Add a Comment...'}
        showCounter={false}
        variant={'simple'}
      />
      {value && (
        <Button variant="textButton" onClick={handleSubmit} disabled={isPending}>
          {isPending ? 'Publishing...' : 'Publish'}
        </Button>
      )}
    </div>
  )
}
