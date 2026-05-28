'use client'

import { Suspense } from 'react'
import {
  SchemaPostViewModel,
  SchemaProfileViewModel,
  SchemaPublicProfileViewModel,
} from '@/shared/api/schema'
import { useMeQuery } from '@/shared/api/useMeQuery'
import { ImageModalServer } from '@/features/post/viewPost/ui/ImageModalServer'
import { AllPosts } from '@/pages/main/api/getAllPostsServer'
import { useAuth } from '@/shared/hooks/useAuth'
import { Loader } from '@/shared/ui/Loader/Loader'
import { PostSimple } from '@/shared/ui/Posts/PostSimple/PostSimple'
import { ProfileHeader } from '@/shared/ui/ProfileHeader/ProfileHeader'
import styles from './Profile.module.scss'

type Props = {
  profileInfo: SchemaProfileViewModel | SchemaPublicProfileViewModel
  userPosts: AllPosts
  imageModalPost?: SchemaPostViewModel
}

export const Profile = ({ profileInfo, userPosts, imageModalPost }: Props) => {
  const { isAuth } = useAuth()
  const { data: me } = useMeQuery()
  const profileType =
    me?.userId === profileInfo.id ? 'profile' : isAuth ? 'user' : 'unauthorized'

  return (
    <div className={styles.container}>
        <ProfileHeader
        user={profileInfo}
        publicationCount={userPosts.totalCount}
        type={profileType}
      />
      <PostSimple posts={userPosts} />
      {imageModalPost && (
        <Suspense fallback={<Loader />}>
          <ImageModalServer imageModalPost={imageModalPost} />
        </Suspense>
      )}
    </div>
  )
}
