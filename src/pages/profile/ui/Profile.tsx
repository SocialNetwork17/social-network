'use client'

import { useAuth } from '@/shared/hooks/useAuth'
import styles from './Profile.module.scss'
import ProfileHeader from '@/shared/ui/ProfileHeader/ProfileHeader'
import PostSimple from '@/shared/ui/Posts/PostSimple/PostSimple'
import { useDataMyProfileQuery } from '../api/useDataMyProfileQuery'
import { useDataProfileQuery } from '@/pages/profile/api/useDataProfileQuery'
import ProfileSkeleton from './ProfileSkeleton/ProfileSkeleton'

type Props = {
  ownerId?: number
}

export default function Profile(props: Props) {
  const { ownerId } = props

  const { isAuth } = useAuth()
  const { data, isLoading } = ownerId ? useDataProfileQuery(ownerId) : useDataMyProfileQuery()

  if (isLoading)
    return (
      <div className={styles.container}>
        <ProfileSkeleton />
      </div>
    )

  return (
    <div className={styles.container}>
      {data && <ProfileHeader user={data} type={isAuth ? 'profile' : 'unauthorized'} />}
      {data?.id && <PostSimple userId={data?.id} />}
    </div>
  )
}
