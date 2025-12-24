'use client'

import { useState } from 'react'
import Card from '../../Card/Card'
import styles from './PostSimple.module.scss'
import { PostsArray } from '@/entites/profile/userData'
import ImageModal from '../../Modal/ImageModal/ImageModal'
import { usePostQuery } from '@/pages/profile/api/usePostQuery'

type Props = {
  postsArray: PostsArray[]
}

export default function PostSimple(props: Props) {
  const { postsArray } = props

  const [selectedPost, setSelectedPost] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data, isLoading } = usePostQuery(selectedPost)

  const handleImageClick = (postId: string) => {
    setSelectedPost(postId)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedPost(null)
  }
  return (
    <>
      <div className={styles.postContainer}>
        {postsArray.map(post => (
          <div key={post.id}>
            <Card images={post.images[0]?.url} onClick={() => handleImageClick(post.id)} />
          </div>
        ))}
      </div>
      {selectedPost && data && (
        <ImageModal isOpen={isModalOpen} onClose={closeModal} postInfo={data} isLoading={isLoading}/>
      )}
    </>
  )
}
