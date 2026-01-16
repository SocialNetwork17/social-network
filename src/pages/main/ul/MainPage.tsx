'use client'
import styles from './MainPage.module.scss'
import UserAmount from './UserAmount/UserAmount'
import PostsWithText from '../../../shared/ui/Posts/PostsWithText/PostsWithText'

export default function MainPage() {
  return (
    <div className={styles.container}>
      <UserAmount />
      <PostsWithText />
    </div>
  )
}
