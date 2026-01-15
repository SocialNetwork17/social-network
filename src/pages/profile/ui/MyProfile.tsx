'use client'

import { useAuth } from '@/shared/hooks/useAuth'
import styles from './MyProfile.module.scss'
import { useDataProfileQuery } from '../api/useDataProfileQuery'
import ProfileHeader from '@/shared/ui/ProfileHeader/ProfileHeader'
import PostSimple from '@/shared/ui/Posts/PostSimple/PostSimple'
import Skeleton from '@/shared/ui/Skeleton/Skeleton'

export default function MyProfile() {
  const { isAuth } = useAuth()
  const { data, isLoading } = useDataProfileQuery()

  if (isLoading)
    return (
      <div className={styles.container}>
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
            .map(index => (
              <div key={index}>
                <Skeleton height={240} width={234} />
              </div>
            ))}
        </div>
      </div>
    )

  return (
    <div className={styles.container}>
      {data && <ProfileHeader user={data} type={isAuth ? 'profile' : 'unauthorized'} />}
      {data?.id && <PostSimple userId={data?.id} />}
    </div>
  )
}
