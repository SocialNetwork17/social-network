import { useMutation, useQueryClient } from '@tanstack/react-query'
import { client } from '@/shared/api/client'

type CreateAnswerCommentArgs = {
  postId: number
  commentId: number
  content: string
}

export const useCreateAnswerCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['createAnswer'], // 👈 статический ключ, без переменных
    mutationFn: async ({ postId, commentId, content }: CreateAnswerCommentArgs) => {
      await client.GET('/api/v1/auth/me').catch(() => null)

      const response = await client.POST('/api/v1/posts/{postId}/comments/{commentId}/answers', {
        params: {
          path: {
            postId,
            commentId,
          },
        },
        body: {
          content,
        },
      })

      if (response.error) {
        throw new Error(response.error?.messages?.[0]?.message || 'Create post failed')
      }

      return response.data
    },

    onSuccess: (_, { postId, commentId }) => { // 👈 добавили commentId в параметры
      // Инвалидируем все связанные запросы
      queryClient.invalidateQueries({
        queryKey: ['answers', postId, commentId], // 👈 инвалидируем конкретный запрос
        exact: false,
      })
      
      // Также инвалидируем общий запрос комментариев поста
      queryClient.invalidateQueries({
        queryKey: ['comment', postId],
        exact: false,
      })
    },
  })
}