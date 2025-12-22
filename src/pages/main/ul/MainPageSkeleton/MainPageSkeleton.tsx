import styles from '../UserAmount/UserAmount.module.scss'
import styles2 from '../Posts/Posts.module.scss'
import styles3 from './MainPageSkeleton.module.scss'
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
        {Array(4)
          .fill(null)
          .map(index => (
            <div className={styles3.container} key={index}>
              <Skeleton height={240} width={234} />
              <div className={styles3.block}>
                <Skeleton height={36} width={36} bordeRadius={18} />
                <Skeleton height={16} width={82} />
              </div>
              <Skeleton height={16} width={63} />
              <Skeleton height={63} width={234} />
            </div>
          ))}
      </div>
    </>
  )
}
