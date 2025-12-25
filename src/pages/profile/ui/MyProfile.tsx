'use client'

import { useAuth } from '@/shared/hooks/useAuth'
import styles from './MyProfile.module.scss'
import { useDataProfileQuery } from '../api/useDataProfileQuery'
import ProfileHeader from '@/shared/ui/UserProfile/ProfileHeader/ProfileHeader'
import { useAllPostsQuery } from '../api/useAllPostsQuery'
import PostSimple from '@/shared/ui/UserProfile/Posts/PostSimple'
import { useUserPostsQuery } from '../api/useUserPostsQuery'

export default function MyProfile() {
  const { isAuth } = useAuth()
  const { data, isLoading, isError } = useDataProfileQuery()
  // const { data: postsData } = useAllPostsQuery()
  const { data: postsData } = useUserPostsQuery(data?.id)

  if (isLoading) return <div>Загрузка профиля...</div>
  if (isError) return <div>Ошибка</div>

  return (
    <div className={styles.container}>
      <ProfileHeader user={data} type={isAuth ? 'profile' : 'unauthorized'} />
      {postsData && <PostSimple postsArray={postsData.items} />}
    </div>
  )
}
