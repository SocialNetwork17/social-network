import styles from './PostFeed.module.scss'
import { usePathname, useRouter } from 'next/navigation'
import { AllPosts } from '@/pages/main/api/getAllPostsServer'
import { CardFeed } from '../../CardFeed/CardFeed'

type Props = {
  posts: AllPosts
}

export const PostFeed = ({ posts }: Props) => {
  const router = useRouter()
  const path = usePathname()

  const handleImageClick = (postId: number) => {
    router.push(`${path}?postId=${postId}`, { scroll: false })
  }

  return (
    <div className={styles.postContainer}>
      {posts.items.map(post => {
        return (
          <div key={post.id}>
            <CardFeed postItem={post} onClick={() => handleImageClick(post.id)} />
          </div>
        )
      })}
    </div>
  )
}
