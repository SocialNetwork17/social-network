import styles from './MainPage.module.scss'
import {UserAmount} from './UserAmount/UserAmount'
import {AllPosts} from "@/pages/main/api/getAllPostsServer";
import {PostsWithText} from "@/shared/ui/Posts/PostsWithText/PostsWithText";

type Props = {
    posts: AllPosts
    totalCount: { totalCount: number }
}

export const MainPage = ({posts, totalCount}: Props) =>{

  return (
    <div className={styles.container}>
      <UserAmount totalCount={totalCount.totalCount} />
      <PostsWithText posts={posts} />
    </div>
  )
}
