'use client'

import { useEffect, useState } from 'react'
import styles from './ImageModalServer.module.scss'
import { EditPostHeader } from '@/features/post/viewPost/ui/EditPostHeader/EditPostHeader'
import { IconButton } from '@/shared/ui/IconButton/IconButton'
import { EditModeSection } from '@/features/post/viewPost/ui/EditModeSection/EditModeSection'
import { ImageModalHeader } from '@/features/post/viewPost/ui/ImageModalHeader/ImageModalHeader'
import { useDeletePostIdFromUrl } from '@/shared/hooks/useDeletePostIdFromUrl'
import { Card } from '@/shared/ui/Card/Card'
import { Comment } from '@/shared/ui/Comment/Comment'
import { SchemaPostViewModel } from '@/shared/api/schema'
import { ViewModeType } from '@/features/post/viewPost/ui/model/imageModalServer.types'
import { useLockScroll } from '@/shared/hooks/useLockScroll'
import { useCommentsQuery } from '@/shared/api/useCommentsQuery'
import { CommentsInfinity } from '@/shared/ui/CommentsBlock/CommentsInfinity/CommentsInfinity'
import { CreateComment } from '@/shared/ui/CardFeed/CreateComment/CreateComment'
import { LikesWithAvatar } from '@/shared/ui/LikesWithAvatar/LikesWithAvatar'
import { FeedTools } from '@/shared/ui/CardFeed/FeedTools/FeedTools'
import { useAuth } from '@/shared/hooks/useAuth'
import { getExactDate } from '@/shared/utils/getExactDate'

type Props = {
  imageModalPost: SchemaPostViewModel
}

export const ImageModalServer = ({ imageModalPost }: Props) => {
  const [text, setText] = useState('')
  const { deletePostIdFromUrl } = useDeletePostIdFromUrl()
  const [viewMode, setViewMode] = useState<ViewModeType>('VIEW_POST')
  const { isAuth } = useAuth()

  useLockScroll(!!imageModalPost)

  useEffect(() => {
    if (imageModalPost && viewMode === 'EDIT_POST') {
      setText(imageModalPost.description)
    }
  }, [imageModalPost, viewMode])

  const imageSlider = imageModalPost.images.map(image => image.url)

  const handleCloseViewPostModal = () => {
    deletePostIdFromUrl()
  }

  const onBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      deletePostIdFromUrl()
    }
  }

  const { data: comments } = useCommentsQuery(imageModalPost.id)

  const dateTime = getExactDate(imageModalPost.createdAt)

  return (
    <div onClick={onBackdropClick} className={styles.backdrop}>
      <div className={styles.modalContent}>
        {viewMode === 'EDIT_POST' && <EditPostHeader setViewMode={setViewMode} />}
        <Card images={imageSlider} slider width={490} height={564} />
        <div className={styles.modalDescription}>
          <ImageModalHeader
            imageModalPost={imageModalPost}
            isEditMode={viewMode === 'EDIT_POST'}
            setViewMode={setViewMode}
          />
          <div className={styles.comments}>
            {viewMode === 'VIEW_POST' && (
              <Comment
                createdAt={imageModalPost.createdAt}
                ownerId={imageModalPost.ownerId}
                avatarOwner={imageModalPost.avatarOwner}
                userName={imageModalPost.userName}
                comment={imageModalPost.description}
                likeCount={imageModalPost.likesCount}
                postId={imageModalPost.id}
              />
            )}
            {viewMode === 'EDIT_POST' && (
              <EditModeSection
                text={text}
                imageModalPost={imageModalPost}
                setText={setText}
                setViewMode={setViewMode}
              />
            )}

            {viewMode !== 'EDIT_POST' && comments?.items && (
              <CommentsInfinity comments={comments?.items} postId={imageModalPost.id}/>
            )}
          </div>
          <div className={styles.tools}>
            {viewMode !== 'EDIT_POST' && isAuth && <FeedTools />}
            <div>
              {viewMode !== 'EDIT_POST' && (
                <LikesWithAvatar
                  avatarWhoLikes={imageModalPost.avatarWhoLikes}
                  likesCount={imageModalPost.likesCount}
                />
              )}
              <div className={styles.time}>{dateTime}</div>
            </div>
          </div>

          {viewMode !== 'EDIT_POST' && isAuth && (
            <CreateComment postId={imageModalPost.id} variant={'new comment'} />
          )}
        </div>

        {viewMode !== 'EDIT_POST' && (
          <div className={styles.closeButton}>
            <IconButton onClick={handleCloseViewPostModal} iconId={'logoutBtnCloseSvg'} />
          </div>
        )}
      </div>
    </div>
  )
}
