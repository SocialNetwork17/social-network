'use client'

import { Card } from '../../Card/Card'
import styles from './PostSimple.module.scss'
import { useUserPostsQuery } from '@/shared/api/useUserPostsQuery'
import { useModal } from '@/widgets/modal/model/modal.context'
import { openViewPostModalAC } from '@/widgets/modal/model/modal.types'
import { SchemaPostViewModel } from '@/shared/api/schema'
import { useRouter } from 'next/navigation'

type Props = {
  userId: number
}

export const PostSimple = (props: Props) => {
  const { userId } = props
  const router = useRouter()

  const { data: posts, isLoading } = useUserPostsQuery(userId)

  const { pushModal } = useModal()

  const handleImageClick = (post: SchemaPostViewModel) => {
    // Добавляем query параметры в URL
    router.push(`/profile/${userId}?postId=${post.id}`, { scroll: false })

    pushModal(openViewPostModalAC({ postId: post.id }))
  }

  if (!isLoading && !posts?.items) return <div>Пока нет публикаций</div>

  return (
    <>
      <div className={styles.postContainer}>
        {posts?.items &&
          posts?.items.map(post => {
            const imageSlider = post.images.map(image => image.url)
            return (
              <div key={post.id}>
                <Card images={imageSlider} onClick={() => handleImageClick(post)} />
              </div>
            )
          })}
      </div>
    </>
  )
}
