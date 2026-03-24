import {Card} from '../../Card/Card'
import styles from './PostSimple.module.scss'
import {usePathname, useRouter} from 'next/navigation'
import {AllPosts} from "@/pages/main/api/getAllPostsServer";

type Props = {
  posts: AllPosts
}

export const PostSimple = ({posts}: Props) => {
  const router = useRouter()
  const path = usePathname()

  const handleImageClick = (postId: number) => {
    router.push(`${path}?postId=${postId}`,{ scroll: false })
  }

  if (!posts.items.length) return <div>Пока нет публикаций</div>

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
