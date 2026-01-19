import { useUserTotalCountQuery } from '../../api/useUserTotalCountQuery'
import styles from './UserAmount.module.scss'

export default function UserAmount() {
  const { data, isLoading } = useUserTotalCountQuery()


  const arrayTotalUser =  data?.totalCount?.toString().padStart(6, '0').split('')

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
