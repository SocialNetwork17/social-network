import styles from './UserAmount.module.scss'

export default function UserAmount() {
  const totalRegisteredUser = '009213' //приходят данные с backend
  const arrayTotalUser = totalRegisteredUser.split('')

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
