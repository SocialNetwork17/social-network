'use client'

import { useAllPostsQuery } from '@/shared/api/useAllPostsQuery'
import styles from './PostsWithText.module.scss'
import CardWithText from '@/shared/ui/CardWithText/CardWithText'
import Skeleton from '../../Skeleton/Skeleton'
import { useState } from 'react'
import { usePostQuery } from '@/shared/api/usePostQuery'
import ImageModal from '../../Modal/ImageModal/ImageModal'

export default function PostsWith() {
  const { data: lastAddedPosts, isLoading } = useAllPostsQuery()

  //эта часть дублируется
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

  return (
    <>
      <div className={styles.container}>
        {isLoading &&
          Array(4)
            .fill(null)
            .map(index => (
              <div className={styles.wpapper} key={index}>
                <Skeleton height={240} width={234} />
                <div className={styles.block}>
                  <Skeleton height={36} width={36} bordeRadius={18} />
                  <Skeleton height={16} width={82} />
                </div>
                <Skeleton height={16} width={63} />
                <Skeleton height={63} width={234} />
              </div>
            ))}
            
        {lastAddedPosts?.items.map(el => (
          <CardWithText post={el} key={el.id} onClick={() => handleImageClick(el.id)}/>
        ))}
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
