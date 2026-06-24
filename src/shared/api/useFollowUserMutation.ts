import {useMutation, useQueryClient} from '@tanstack/react-query'
import { client } from '@/shared/api/client'

export const useFollowUserMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['follow user'],
    mutationFn: async ({ selectedUserId }: { selectedUserId: number }) => {
      const response = await client.POST('/api/v1/users/following', {
        body: {
          selectedUserId,
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
