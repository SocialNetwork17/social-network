import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { client } from '@/shared/api/client'
import { SchemaPostViewModel } from '@/shared/api/schema'
import { useAuth } from '@/shared/hooks/useAuth'
import { useUpdatePostLikeStatusMutation } from '@/shared/api/useUpdatePostLikeStatusMutation'

type PostLikeState = Pick<SchemaPostViewModel, 'isLiked' | 'likesCount' | 'avatarWhoLikes'>

const getPostLikeStateQueryKey = (postId: number, userId?: number) =>
  ['post', postId, 'like-state', userId ?? 'guest'] as const

const getInitialState = (post: SchemaPostViewModel): PostLikeState => ({
  isLiked: post.isLiked,
  likesCount: post.likesCount,
  avatarWhoLikes: post.avatarWhoLikes,
})

export const usePostLikeState = (post: SchemaPostViewModel) => {
  const queryClient = useQueryClient()
  const { isAuth, isLoading, user } = useAuth()
  const { mutateAsync: updatePostLikeStatus } = useUpdatePostLikeStatusMutation()
  const [isLikePending, setIsLikePending] = useState(false)

  const initialState = getInitialState(post)
  const postLikeStateQueryKey = getPostLikeStateQueryKey(post.id, user?.userId)

  const { data: postLikeState = initialState } = useQuery({
    queryKey: postLikeStateQueryKey,
    queryFn: async () => {
      const response = await client.GET('/api/v1/posts/id/{postId}', {
        params: {
          path: {
            postId: post.id,
          },
        },
      })

      if (response.error || !response.data) {
        return initialState
      }

      return {
        isLiked: response.data.isLiked,
        likesCount: response.data.likesCount,
        avatarWhoLikes: response.data.avatarWhoLikes,
      }
    },
    initialData: initialState,
    enabled: !isLoading,
    staleTime: 0,
  })

  const handleLikeClick = async () => {
    if (!isAuth || !user || isLikePending) {
      return
    }

    const previousState = queryClient.getQueryData<PostLikeState>(postLikeStateQueryKey) ?? initialState
    const nextIsLiked = !previousState.isLiked
    const nextLikeStatus: 'NONE' | 'LIKE' = previousState.isLiked ? 'NONE' : 'LIKE'

    setIsLikePending(true)
    queryClient.setQueryData<PostLikeState>(postLikeStateQueryKey, {
      ...previousState,
      isLiked: nextIsLiked,
      likesCount: previousState.isLiked
        ? Math.max(previousState.likesCount - 1, 0)
        : previousState.likesCount + 1,
    })

    try {
      await updatePostLikeStatus({
        postId: post.id,
        likeStatus: nextLikeStatus,
      })
    } catch {
      queryClient.setQueryData(postLikeStateQueryKey, previousState)
    } finally {
      void queryClient.invalidateQueries({
        queryKey: postLikeStateQueryKey,
      })
      setIsLikePending(false)
    }
  }

  return {
    isLikePending,
    likesCount: postLikeState.likesCount,
    isLiked: postLikeState.isLiked,
    avatarWhoLikes: postLikeState.avatarWhoLikes,
    handleLikeClick,
  }
}
