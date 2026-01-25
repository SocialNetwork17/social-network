import Skeleton from '@/shared/ui/Skeleton/Skeleton'
import styles from './PostWithTextSkeleton.module.scss'

export default function PostWithTextSkeleton() {
  return (
    <div className={styles.container}>
      {Array(4)
        .fill(null)
        .map((_, index) => (
          <div className={styles.wpapper} key={index}>
            <Skeleton height={240} width={234} />
            <div className={styles.block}>
              <Skeleton height={36} width={36} bordeRadius={18} />
              <Skeleton height={16} width={82} />
            </div>
            <Skeleton height={16} width={63} />
            <Skeleton height={63} width={234} />
          </div>
        ))}
      А
    </div>
  )
}
