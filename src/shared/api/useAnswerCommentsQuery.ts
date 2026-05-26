import { useQuery } from '@tanstack/react-query'
import { client } from '@/shared/api/client'
import { SchemaAnswersViewModel } from './schema'

type AnswersApiResponse = {
  pageSize: number
  totalCount: number
  notReadCount?: number
  items: SchemaAnswersViewModel[]
}

export const useAnswerCommentsQuery = (postId?: number, commentId?: number) => {
  return useQuery<SchemaAnswersViewModel[]>({
    queryKey: ['answers', postId, commentId],
    queryFn: async () => {
      if (!postId || !commentId) {
        throw new Error('Post ID and Comment ID are required')
      }
      
      const response = await client.GET('/api/v1/posts/{postId}/comments/{commentId}/answers', {
        params: {
          path: {
            postId: postId,
            commentId: commentId,
          },
        },
      })
      
      return (response.data as AnswersApiResponse)?.items
    },
    enabled: !!postId && !!commentId,
    refetchInterval: 2 * 60 * 1000,
  })
}