import styles from './UserAmount.module.scss'

type Props = {
  totalCount: number
}

export const UserAmount = ({ totalCount }: Props) => {
  const arrayTotalUser = totalCount?.toString().padStart(6, '0').split('')

  return (
    <div className={styles.container}>
      <div className={styles.text}>Registered users:</div>
      <div className={styles.amount}>
        {!totalCount &&
          Array(6)
            .fill(null)
            .map((el, index) => <span key={index}>{el}</span>)}
        {arrayTotalUser?.length && arrayTotalUser.map((el, index) => <span key={index}>{el}</span>)}
      </div>
    </div>
  )
}
