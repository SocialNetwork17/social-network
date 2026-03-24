'use client'
import styles from './PostsWithText.module.scss'
import {CardWithText} from '@/shared/ui/CardWithText/CardWithText'
import { AllPosts } from '@/pages/main/api/getAllPostsServer'
import {PostWithTextSkeleton} from './PostWithTextSkeleton/PostWithTextSkeleton'
import { useRouter } from 'next/navigation'

type Props = {
  posts: AllPosts
}

export const PostsWithText = ({ posts }: Props) => {

  const router = useRouter()

  const handleImageClick = (postId: number) => {
    router.push(`/?postId=${postId}`, { scroll: false })
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
