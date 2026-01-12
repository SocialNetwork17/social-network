'use client'

import { useAuth } from '@/shared/hooks/useAuth'
import styles from './MyProfile.module.scss'
import { useDataProfileQuery } from '../api/useDataProfileQuery'
import ProfileHeader from '@/shared/ui/UserProfile/ProfileHeader/ProfileHeader'
import PostSimple from '@/shared/ui/UserProfile/Posts/PostSimple'

export default function MyProfile() {
  const { isAuth } = useAuth()
  const { data, isLoading, isError } = useDataProfileQuery()

  if (isLoading) return <div>Загрузка профиля...</div>
  if (isError) return <div>Ошибка</div>

  return (
    <div className={styles.container}>
      {data && <ProfileHeader user={data} type={isAuth ? 'profile' : 'unauthorized'} />}
      {data?.id && <PostSimple userId={data?.id} />}
    </div>
  )
}
