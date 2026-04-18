import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query'
import { client } from '@/shared/api/client'
import { NotificationsPage } from '@/features/notifications/api/useGetNotifications'

export const useMarkNotificationsAsRead = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (ids: number[]) => {
      const response = await client.PUT('/api/v1/notifications/mark-as-read', {
        body: { ids },
      })

      if (response.error) {
        throw response.error
      }
    },
    onSuccess: (_, ids) => {
      queryClient.setQueryData<InfiniteData<NotificationsPage>>(['notifications'], oldData => {
        if (!oldData) return oldData

        const readIds = new Set(ids)

        const readCount = oldData.pages
          .flatMap(page => page.items ?? [])
          .filter(notification => readIds.has(notification.id) && !notification.isRead).length

        return {
          ...oldData,
          pages: oldData.pages.map((page, index) => ({
            ...page,
            notReadCount: index === 0 ? Math.max((page.notReadCount ?? 0) - readCount, 0) : page.notReadCount,
            items: page.items?.map(notification =>
              readIds.has(notification.id) ? { ...notification, isRead: true } : notification
            ),
          })),
        }
      })
    },
  })
}
