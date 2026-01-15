'use client'

import { useState } from 'react'
import Card from '../../Card/Card'
import styles from './PostSimple.module.scss'
import ImageModal from '../../Modal/ImageModal/ImageModal'
import { usePostQuery } from '@/pages/profile/api/usePostQuery'
import { useUserPostsQuery } from '@/shared/api/useUserPostsQuery'

type Props = {
  userId: number
}

export default function PostSimple(props: Props) {
  const { userId } = props

  const { data: userPosts, isLoading } = useUserPostsQuery(userId)

  const [selectedPost, setSelectedPost] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data: postInfo, isLoading: isLoadingModal } = usePostQuery(selectedPost as number)

  const handleImageClick = (postId: number) => {
    setSelectedPost(postId)
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedPost(null)
  }

  if (!isLoading && !userPosts?.items) return <div>Пока нет публикаций</div>
  
  return (
    <>
      <div className={styles.postContainer}>
        {userPosts?.items &&
          userPosts?.items.map(post => {
            const imageSlider = post.images.map(image => image.url)
            return (
              <div key={post.id}>
                <Card images={imageSlider} onClick={() => handleImageClick(post.id)} />
              </div>
            )
          })}
      </div>
      {selectedPost && postInfo && isModalOpen && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={closeModal}
          postInfo={postInfo}
          isLoading={isLoadingModal}
        />
      )}
    </>
  )
}
