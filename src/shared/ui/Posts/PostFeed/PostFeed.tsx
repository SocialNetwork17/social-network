import {Card} from '../../Card/Card'
import styles from './PostFeed.module.scss'
import {usePathname, useRouter} from 'next/navigation'
import {AllPosts} from "@/pages/main/api/getAllPostsServer";

type Props = {
  posts: AllPosts
}

export const PostFeed = ({posts}: Props) => {
  const router = useRouter()
  const path = usePathname()

  const handleImageClick = (postId: number) => {
    router.push(`${path}?postId=${postId}`,{ scroll: false })
  }

  return (
    <>
      <div className={styles.postContainer}>
        {posts?.items &&
          posts?.items.map(post => {
            const imageSlider = post.images.map(image => image.url)
            return (
              <div key={post.id}>
                <Card images={imageSlider} onClick={() => handleImageClick(post.id)} />
              </div>
            )
          })}
      </div>
    </>
  )
}
