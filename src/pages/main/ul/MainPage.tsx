'use client'
import styles from './MainPage.module.scss'
import UserAmount from './UserAmount/UserAmount'
import Posts from './Posts/Posts'
import MainPageSkeleton from './MainPageSkeleton/MainPageSkeleton'

export default function MainPage() {
  const isLoading = false // позже появиться хук

  if (isLoading) {
    return (
      <div className={styles.container}>
        <MainPageSkeleton />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <UserAmount />
      <Posts />
    </div>
  )
}
