import {useMutation, useQueryClient} from '@tanstack/react-query'
import { client } from '@/shared/api/client'

export const useUnfollowUserMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['unfollow user'],
    mutationFn: async ({ userId }: { userId: number }) => {
      const response = await client.DELETE('/api/v1/users/follower/{userId}', {
        params: {
          path: {
            userId,
          },
        },
      })

      if (response.error) {
        throw response.error
      }

      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['following-posts']
      })
    },
  })
}
