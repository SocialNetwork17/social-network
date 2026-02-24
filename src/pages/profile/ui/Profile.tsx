'use client'

import { useAuth } from '@/shared/hooks/useAuth'
import styles from './Profile.module.scss'
import { ProfileHeader } from '@/shared/ui/ProfileHeader/ProfileHeader'
import { PostSimple } from '@/shared/ui/Posts/PostSimple/PostSimple'
import { useDataMyProfileQuery } from '../api/useDataMyProfileQuery'
import { useDataProfileQuery } from '@/pages/profile/api/useDataProfileQuery'
import { ProfileSkeleton } from './ProfileSkeleton/ProfileSkeleton'
import { SchemaProfileViewModel, SchemaPublicProfileViewModel } from '@/shared/api/schema'

type Props = {
  profileInfo: SchemaProfileViewModel | SchemaPublicProfileViewModel
}

export const Profile = (props: Props) => {
  const { profileInfo } = props

  const { isAuth } = useAuth()
  // const { data, isLoading } = ownerId ? useDataProfileQuery(ownerId) : useDataMyProfileQuery()

  // if (isLoading)
  //   return (
  //     <div className={styles.container}>
  //       <ProfileSkeleton />
  //     </div>
  //   )

  return (
    <div className={styles.container}>
      <ProfileHeader user={profileInfo} type={isAuth ? 'profile' : 'unauthorized'} />
      <PostSimple userId={profileInfo.id} />
    </div>
  )
}
