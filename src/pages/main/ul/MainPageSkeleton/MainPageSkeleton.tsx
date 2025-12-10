import styles from '../UserAmount/UserAmount.module.scss'
import styles2 from '../Posts/Posts.module.scss'
import stylesMain from './MainPageSkeleton.module.scss'
import Skeleton from '@/shared/ui/Skeleton/Skeleton'

export default function MainPageSkeleton() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.text}>Registered users:</div>
        <div className={styles.amount}>
          {Array(6)
            .fill(null)
            .map((el, index) => (
              <span key={index}>{el}</span>
            ))}
        </div>
      </div>
      <div className={styles2.container}>
        {Array(4).map(index => (
          <div className={stylesMain.container} key={index}>
            <Skeleton height={240} width={234} />
            <Skeleton height={36} width={130} />
            <Skeleton height={72} width={234} />
          </div>
        ))}
      </div>
    </>
  )
}
