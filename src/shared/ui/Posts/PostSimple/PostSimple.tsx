'use client'

import Card from '../../Card/Card'
import styles from './PostSimple.module.scss'
import {useUserPostsQuery} from '@/shared/api/useUserPostsQuery'
import {useModal} from '@/widgets/modal/model/modal.context'
import {openViewPostModalAC} from '@/widgets/modal/model/modal.types'
import {SchemaPostViewModel} from "@/shared/api/schema";


type Props = {
  userId: number
}

export default function PostSimple(props: Props) {
  const { userId } = props

  const { data: userPosts, isLoading } = useUserPostsQuery(userId)

  const { pushModal } = useModal()

  const handleImageClick = (post: SchemaPostViewModel) => {
    pushModal(openViewPostModalAC({ postId: post.id }))
  }

  /*todo*/
  if (!isLoading && !userPosts?.items) return <div>Пока нет публикаций</div>

  return (
    <>
      <div className={styles.postContainer}>
        {userPosts?.items &&
          userPosts?.items.map(post => {
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
