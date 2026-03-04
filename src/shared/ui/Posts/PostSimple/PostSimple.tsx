import {Card} from '../../Card/Card'
import styles from './PostSimple.module.scss'
import {useModal} from '@/widgets/modal/model/modal.context'
import {openViewPostModalAC} from '@/widgets/modal/model/modal.types'
import {usePathname, useRouter} from 'next/navigation'
import {AllPosts} from "@/pages/main/api/getAllPostsServer";

type Props = {
  posts: AllPosts
}

export const PostSimple = (props: Props) => {
  const { posts} = props
  const router = useRouter()
  const path = usePathname()

  const { pushModal } = useModal()

  const handleImageClick = (postId: number) => {
    router.push(`${path}?postId=${postId}`,{ scroll: false })
    pushModal(openViewPostModalAC({ postId: postId }))
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
