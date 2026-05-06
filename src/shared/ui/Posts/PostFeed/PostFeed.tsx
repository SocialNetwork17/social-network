import styles from './PostFeed.module.scss'
import { usePathname, useRouter } from 'next/navigation'
import { CardFeed } from '../../CardFeed/CardFeed'
import { getInfinitePosts } from '@/pages/feed/api/getInfinitePosts'
import { SchemaPostViewModel } from '@/shared/api/schema'
import { useState } from 'react'

type Props = {
  posts: SchemaPostViewModel[]
}

export const PostFeed = ({ posts: initialPosts }: Props) => {
   const router = useRouter()
  const path = usePathname()

  const lastPostId = initialPosts[initialPosts.length - 1]?.id || 0

  const { posts: additionalPosts, loading, hasMore, observerTarget } = getInfinitePosts({
    lastPostId,
    pageSize: 4,
  })

  const allPosts = [...initialPosts, ...additionalPosts]

  const handleImageClick = (postId: number) => {
    router.push(`${path}?postId=${postId}`, { scroll: false })
  }

  return (
    <>
      <div className={styles.postContainer}>
        {allPosts.map(post => (
          <div key={post.id}>
            <CardFeed postItem={post} onClick={() => handleImageClick(post.id)} />
          </div>
        ))}

        <div ref={observerTarget} className={styles.observer}>
          {loading && <div className={styles.loader}>Loading...</div>}
          {!hasMore && <div className={styles.endMessage}>No more posts</div>}
        </div>
      </div>
    </>
  )
}
