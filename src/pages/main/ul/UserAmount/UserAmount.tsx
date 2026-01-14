import styles from './UserAmount.module.scss'

type Props = {
  totalRegisteredUser?: number
}

export default function UserAmount(props: Props) {
  const { totalRegisteredUser = 0 } = props

  const arrayTotalUser = totalRegisteredUser.toString().split('')

  return (
    <div className={styles.container}>
      <div className={styles.text}>Registered users:</div>
      <div className={styles.amount}>
        {arrayTotalUser.map((el, index) => (
          <span key={index}>{el}</span>
        ))}
      </div>
    </div>
  )
}
