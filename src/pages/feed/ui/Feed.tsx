'use client'
import styles from './Feed.module.scss'
import {
  SchemaPostViewModel,
} from '@/shared/api/schema'
import { AllPosts } from '@/pages/main/api/getAllPostsServer'
import { Suspense } from 'react'
import { Loader } from '@/shared/ui/Loader/Loader'
import { ImageModalServer } from '@/features/post/viewPost/ui/ImageModalServer'
import { PostFeed } from '@/shared/ui/Posts/PostFeed/PostFeed'


type Props = {
  posts: AllPosts
  imageModalPost?: SchemaPostViewModel
}

export const Feed = ({ posts, imageModalPost }: Props) => {
  return (
    <div className={styles.container}>
      <PostFeed posts={posts.items} totalCount={posts.totalCount}/>
      {imageModalPost && (
        <Suspense fallback={<Loader />}>
          <ImageModalServer imageModalPost={imageModalPost} />
        </Suspense>
      )}
    </div>
  )
}
