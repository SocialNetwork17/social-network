import { useEffect, useState } from 'react'
import styles from './PostFeed.module.scss'
import { usePathname, useRouter } from 'next/navigation'
import { AllPosts } from '@/pages/main/api/getAllPostsServer'
import { client } from '@/shared/api/client'
import { SchemaPostViewModel } from '@/shared/api/schema'
import { useAuth } from '@/shared/hooks/useAuth'
import { useUpdatePostLikeStatusMutation } from '@/shared/api/useUpdatePostLikeStatusMutation'
import { CardFeed } from '../../CardFeed/CardFeed'

type Props = {
  posts: AllPosts
}

export const PostFeed = ({ posts }: Props) => {
  const router = useRouter()
  const path = usePathname()
  const { isAuth, isLoading, user } = useAuth()
  const [feedPosts, setFeedPosts] = useState<SchemaPostViewModel[]>(posts.items)
  const [pendingPostIds, setPendingPostIds] = useState<number[]>([])
  const { mutateAsync: updatePostLikeStatus } = useUpdatePostLikeStatusMutation()

  useEffect(() => {
    setFeedPosts(posts.items)
  }, [posts])

  useEffect(() => {
    if (!isAuth || isLoading || !user) {
      return
    }

    const syncLikeStatuses = async () => {
      const updatedPosts = await Promise.all(
        posts.items.map(async post => {
          const response = await client.GET('/api/v1/posts/{postId}/likes', {
            params: {
              path: {
                postId: post.id,
              },
              query: {
                search: user.userName,
                pageSize: 1,
              },
            },
          })

          if (response.error || !response.data) {
            return post
          }

          const isLiked = Boolean(response.data.items?.some(item => item.userId === user.userId))

          return {
            ...post,
            isLiked,
          }
        })
      )

      setFeedPosts(updatedPosts)
    }

    syncLikeStatuses()
  }, [isAuth, isLoading, posts, user])

  const handleImageClick = (postId: number) => {
    router.push(`${path}?postId=${postId}`, { scroll: false })
  }

  const handleLikeClick = async (postId: number) => {
    if (pendingPostIds.includes(postId)) {
      return
    }

    const currentPost = feedPosts.find(post => post.id === postId)

    if (!currentPost) {
      return
    }

    const nextLikeStatus: 'NONE' | 'LIKE' = currentPost.isLiked ? 'NONE' : 'LIKE'

    setPendingPostIds(prev => [...prev, postId])
    setFeedPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likesCount: post.isLiked ? Math.max(post.likesCount - 1, 0) : post.likesCount + 1,
            }
          : post
      )
    )

    try {
      await updatePostLikeStatus({
        postId,
        likeStatus: nextLikeStatus,
      })
    } catch {
      setFeedPosts(prev => prev.map(post => (post.id === postId ? currentPost : post)))
    } finally {
      setPendingPostIds(prev => prev.filter(id => id !== postId))
    }
  }

  return (
    <>
      <div className={styles.postContainer}>
        {feedPosts &&
          feedPosts.map(post => {
            return (
              <div key={post.id}>
                <CardFeed
                  postItem={post}
                  onClick={() => handleImageClick(post.id)}
                  onLikeClick={() => handleLikeClick(post.id)}
                  isLikePending={pendingPostIds.includes(post.id)}
                />
              </div>
            )
          })}
      </div>
    </>
  )
}
