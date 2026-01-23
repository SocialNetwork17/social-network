import styles from './MainPage.module.scss'
import UserAmount from './UserAmount/UserAmount'
import PostsWithText from '../../../shared/ui/Posts/PostsWithText/PostsWithText'
import {AllPosts} from "@/pages/main/api/getAllPostsServer";

type Props = {
    posts: AllPosts
    totalCount: { totalCount: number }
}

export default function MainPage({posts, totalCount}: Props) {
  return (
    <div className={styles.container}>
      <UserAmount totalCount={totalCount.totalCount} />
      <PostsWithText posts={posts} />
    </div>
  )
}
