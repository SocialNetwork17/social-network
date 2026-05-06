import { getAllPostsServer } from '@/pages/main/api/getAllPostsServer'
import styles from '../../rootLayout.module.scss'
import { getModalPostByIdServer } from '@/features/post/viewPost/api/getModalPostByIdServer'
import { Feed } from '@/pages/feed/ui/Feed'

type Props = {
    searchParams: Promise<{ postId: string }>
}

export default async function Home({searchParams}: Props) {
  const { postId } = await searchParams

  const [posts, imageModalPost] = await Promise.all([
    getAllPostsServer(),
    postId ? getModalPostByIdServer(Number(postId)) : Promise.resolve(undefined),
  ])

  return <div className={styles.page}><Feed posts={posts}  imageModalPost={imageModalPost}/></div>
}
