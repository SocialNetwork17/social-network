import { useAllPostsQuery } from '../../../../shared/api/useAllPostsQuery'
import styles from './UserAmount.module.scss'

export default function UserAmount() {
  const { data: lastAddedPosts, isLoading } = useAllPostsQuery()

  const arrayTotalUser = lastAddedPosts?.totalUsers.toString().split('')

  return (
    <div className={styles.container}>
      <div className={styles.text}>Registered users:</div>
      <div className={styles.amount}>
        {isLoading &&
          Array(6)
            .fill(null)
            .map((el, index) => <span key={index}>{el}</span>)}
        {arrayTotalUser?.length && arrayTotalUser.map((el, index) => <span key={index}>{el}</span>)}
      </div>
    </div>
  )
}
