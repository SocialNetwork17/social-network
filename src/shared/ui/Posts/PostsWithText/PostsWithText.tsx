'use client'
import styles from './PostsWithText.module.scss'
import {CardWithText} from '@/shared/ui/CardWithText/CardWithText'
import { useModal } from '@/widgets/modal/model/modal.context'
import { openViewPostModalAC } from '@/widgets/modal/model/modal.types'
import { AllPosts } from '@/pages/main/api/getAllPostsServer'
import {PostWithTextSkeleton} from './PostWithTextSkeleton/PostWithTextSkeleton'
import { useRouter } from 'next/navigation'

type Props = {
  posts: AllPosts
}

export const PostsWithText = ({ posts }: Props) => {
  const router = useRouter()
  const { pushModal } = useModal()

  const handleImageClick = (postId: number) => {
     // Добавляем query параметры в URL
    router.push(`/?postId=${postId}`, { scroll: false })

    pushModal(openViewPostModalAC({ postId: postId }))
  }
  return (
    <>
      <div className={styles.container}>
        {!posts.items && PostWithTextSkeleton}
        {posts.items?.map(el => (
          <CardWithText post={el} key={el.id} onClick={() => handleImageClick(el.id)} />
        ))}
      </div>
    </>
  )
}
