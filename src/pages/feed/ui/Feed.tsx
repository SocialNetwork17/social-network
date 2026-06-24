'use client'
import styles from './Feed.module.scss'
import { SchemaPostViewModel } from '@/shared/api/schema'
import { AllPosts } from '@/pages/main/api/getAllPostsServer'
import { Suspense, useEffect, useRef } from 'react'
import { Loader } from '@/shared/ui/Loader/Loader'
import { ImageModalServer } from '@/features/post/viewPost/ui/ImageModalServer'
import { PostFeed } from '@/shared/ui/Posts/PostFeed/PostFeed'
import { useFollowingPosts } from '@/shared/api/useFollowingPosts'
import {ProfileCountsProvider} from "@/entites/profile/model/profileCounts.provider";

type Props = {
  posts: AllPosts
  imageModalPost?: SchemaPostViewModel
}

export const Feed = ({ posts, imageModalPost }: Props) => {
  const { data: followingData, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useFollowingPosts()

  const sentinelRef = useRef<HTMLDivElement>(null)

  // Trigger fetchNextPage when the sentinel div scrolls into view
  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const followingItems = followingData?.pages.flatMap(page => page.items ?? []) ?? []
  const feedPosts = followingItems.length > 0 ? { items: followingItems } : posts

  return (
      <ProfileCountsProvider>
        <div className={styles.container}>
          <PostFeed posts={feedPosts} isLoading={isLoading} isFetchingNextPage={isFetchingNextPage}/>

          {!isLoading && <div ref={sentinelRef} />}

          {imageModalPost && (
            <Suspense fallback={<Loader />}>
              <ImageModalServer imageModalPost={imageModalPost} />
            </Suspense>
          )}
        </div>
      </ProfileCountsProvider>
  )
}
