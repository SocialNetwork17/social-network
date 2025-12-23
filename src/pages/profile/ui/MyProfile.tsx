'use client'

import { useAuth } from '@/shared/hooks/useAuth'
import styles from './MyProfile.module.scss'
import { useDataProfile } from '../api/useDataProfile'
import ProfileHeader from '@/shared/ui/UserProfile/ProfileHeader/ProfileHeader'
import { useAllPosts } from '../api/useAllPosts'
import PostSimple from '@/shared/ui/UserProfile/Posts/PostSimple'

export default function MyProfile() {
  const { isAuth } = useAuth()
  const { data, isLoading, isError } = useDataProfile()
  const { data: postsData } = useAllPosts()

  if (isLoading) return <div>Загрузка профиля...</div>
  if (isError) return <div>Ошибка</div>

  return (
    <div className={styles.container}>
      <ProfileHeader user={data} type={isAuth ? 'profile' : 'unauthorized'} />
      <PostSimple postsArray={postsData?.items}/>
    </div>
  )
}
