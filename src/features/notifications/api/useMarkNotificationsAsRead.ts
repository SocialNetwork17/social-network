import { useMutation, useQueryClient } from '@tanstack/react-query'
import { client } from '@/shared/api/client'

export const useMarkNotificationsAsRead = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['notifications', 'mark as read'],
    mutationFn: async (ids: number[]) => {
      const response = await client.PUT('/api/v1/notifications/mark-as-read', {
        body: { ids },
      })

      if (response.error) {
        throw response.error
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })
}
