'use client'
import styles from './MainPage.module.scss'
import UserAmount from './UserAmount/UserAmount'
import MainPageSkeleton from './MainPageSkeleton/MainPageSkeleton'
import { useAllPostsQuery } from '../api/useAllPostsQuery'
import PostsWithText from '../../../shared/ui/Posts/PostsWithText/PostsWithText'

export default function MainPage() {
  const { data: lastAddedPosts, isLoading } = useAllPostsQuery()

  if (isLoading) {
    return (
      <div className={styles.container}>
        <MainPageSkeleton />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <UserAmount totalRegisteredUser={lastAddedPosts?.totalUsers} />
      {lastAddedPosts?.items.length && <PostsWithText posts={lastAddedPosts.items} />}
    </div>
  )
}
