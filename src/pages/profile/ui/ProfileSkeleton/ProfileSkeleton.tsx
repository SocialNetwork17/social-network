import styles from './ProfileSkeleton.module.scss'
import {Skeleton} from '@/shared/ui/Skeleton/Skeleton'

export const ProfileSkeleton = () => {
    return (
      <>
        <div className={styles.profileContainer}>
          <Skeleton width={192} height={192} bordeRadius={96} />
          <div className={styles.info}>
            <div>
              <Skeleton width={103} height={36} />
            </div>
            <div>
              <Skeleton width={63} height={48} />
              <Skeleton width={63} height={48} />
              <Skeleton width={63} height={48} />
            </div>
          </div>
        </div>
        <div className={styles.postContainer}>
          {Array(8)
            .fill(null)
            .map((_, index) => (
              <div key={index}>
                <Skeleton height={240} width={234} />
              </div>
            ))}
        </div>
      </>
    )
}
