'use client'

import { useMeQuery } from '@/shared/api/useMeQuery'
import { useAuth } from '@/shared/hooks/useAuth'
import styles from './Profile.module.scss'
import { ProfileHeader } from '@/shared/ui/ProfileHeader/ProfileHeader'
import { PostSimple } from '@/shared/ui/Posts/PostSimple/PostSimple'
import { SchemaProfileViewModel, SchemaPublicProfileViewModel } from '@/shared/api/schema'

type Props = {
  profileInfo: SchemaProfileViewModel | SchemaPublicProfileViewModel
}

export const Profile = (props: Props) => {
  const { profileInfo } = props

  const { isAuth } = useAuth()
  const { data: me } = useMeQuery()
  const profileType =
    me?.userId === profileInfo.id ? 'profile' : isAuth ? 'user' : 'unauthorized'

  return (
    <div className={styles.container}>
      <ProfileHeader user={profileInfo} type={profileType} />
      <PostSimple userId={profileInfo.id} />
    </div>
  )
}
