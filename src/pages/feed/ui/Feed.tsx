'use client'

import styles from './Feed.module.scss'
import { Suspense } from 'react'
import { Loader } from '@/shared/ui/Loader/Loader'
import { ImageModalServer } from '@/features/post/viewPost/ui/ImageModalServer'
import { PostFeed } from '@/shared/ui/Posts/PostFeed/PostFeed'
import { useInfinitePosts } from '@/pages/feed/api/useInfinitePosts'
import { useRouter, usePathname } from 'next/navigation'
import { AllPosts } from '@/pages/main/api/getAllPostsServer'
import { SchemaPostViewModel } from '@/shared/api/schema'

type Props = {
  posts: AllPosts
  imageModalPost?: SchemaPostViewModel
}

export const Feed = ({ posts: initialPostsData, imageModalPost }: Props) => {
  const router = useRouter()
  const path = usePathname()
  
  // Один хук - вся логика внутри!
  const {
    posts,
    observerRef,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinitePosts(initialPostsData.items, initialPostsData.totalCount)

  const handleImageClick = (postId: number) => {
    router.push(`${path}?postId=${postId}`, { scroll: false })
  }

  return (
    <div className={styles.container}>
      <PostFeed posts={posts} onPostClick={handleImageClick} />

      {/* Триггер для infinite scroll */}
      <div ref={observerRef} className={styles.observer}>
        {isFetchingNextPage && <div className={styles.center}><Loader /></div>}
        {!hasNextPage && posts.length > 0 && (
          <div>No more posts</div>
        )}
      </div>

      {imageModalPost && (
        <Suspense fallback={<Loader />}>
          <ImageModalServer imageModalPost={imageModalPost} />
        </Suspense>
      )}
    </div>
  )
}