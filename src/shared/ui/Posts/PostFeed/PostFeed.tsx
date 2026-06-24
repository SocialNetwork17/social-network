import styles from './PostFeed.module.scss'
import { usePathname, useRouter } from 'next/navigation'
import { SchemaPostViewModel } from '@/shared/api/schema'
import { client } from '@/shared/api/client'
import { useAuth } from '@/shared/hooks/useAuth'
import { useUpdatePostLikeStatusMutation } from '@/shared/api/useUpdatePostLikeStatusMutation'
import { CardFeed } from '../../CardFeed/CardFeed'
import {Loader} from "@/shared/ui/Loader/Loader";

type Props = {
  posts: { items?: SchemaPostViewModel[] },
    isLoading?: boolean,
    isFetchingNextPage?: boolean,
}

export const PostFeed = ({ posts, isLoading, isFetchingNextPage }: Props) => {
  const router = useRouter()
  const path = usePathname()

  const handleImageClick = (postId: number) => {
    router.push(`${path}?postId=${postId}`, { scroll: false })
  }

  return (
      <div className={styles.postContainer}>
        {isLoading ? <Loader /> : posts.items?.map(post => {
            return (
              <div key={post.id}>
                <CardFeed postItem={post} onClick={() => handleImageClick(post.id)} />
              </div>
            )
          })
        }
        {isFetchingNextPage && <Loader />}
      </div>
  )
}
