'use client'

import styles from './CardFeed.module.scss'
import { Card } from '../Card/Card'
import { SchemaPostViewModel } from '@/shared/api/schema'
import { Comment } from '../Comment/Comment'
import { useState } from 'react'
import { LikesWithAvatar } from '../LikesWithAvatar/LikesWithAvatar'
import { Button } from '../Button/Button'
import { TextArea } from '../TextArea/TextArea'
import { FeedHeader } from './FeedHeader/FeedHeader'
import { FeedTools } from './FeedTools/FeedTools'

type Props = {
  postItem: SchemaPostViewModel
  onClick?: () => void
}

export const CardFeed = ({ postItem, onClick }: Props) => {
  const [value, setValue] = useState('')

  const imageSlider = postItem.images.map(image => image.url)

  const handleOpenComment = () => {}

  return (
    <div className={styles.container}>
      <FeedHeader postItem={postItem} />
      <div className={styles.slider}>
        <Card images={imageSlider} slider={true} onClick={onClick} />
      </div>
      <FeedTools />
      <Comment postinfo={postItem} />
      <LikesWithAvatar avatarWhoLikes={postItem.avatarWhoLikes} likesCount={postItem.likesCount} />
      <Button variant="underline" onClick={handleOpenComment} disabled={false}>
        View All Comments (114)
      </Button>
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
          <Button variant="textButton" onClick={() => {}} disabled={false}>
            Publish
          </Button>
        )}
      </div>
    </div>
  )
}
