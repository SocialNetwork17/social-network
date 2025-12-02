import styles from './MainPage.module.scss'
import UserAmount from './UserAmount/UserAmount'
import Posts from './Posts/Posts'

export default function MainPage() {
  return (
    <div className={styles.container}>
      <UserAmount />
      <Posts />
    </div>
  )
}
