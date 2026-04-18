import { InfiniteData, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { client } from '@/shared/api/client'
import { SchemaInfinityPaginationViewModel, SchemaNotificationViewDto } from '@/shared/api/schema'

export type NotificationsPage = SchemaInfinityPaginationViewModel & {
  items?: SchemaNotificationViewDto[]
}

const NOTIFICATIONS_PAGE_SIZE = 10
const ONE_MONTH_MS = 30 * 24 * 60 * 60 * 1000

export const isNotificationFromLastMonth = (notification: SchemaNotificationViewDto) => {
  const createdAt = new Date(notification.createdAt).getTime()

  if (Number.isNaN(createdAt)) return false

  return Date.now() - createdAt <= ONE_MONTH_MS
}

export const useGetNotifications = () => {
  return useInfiniteQuery({
    queryKey: ['notifications'],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const response = await client.GET('/api/v1/notifications/{cursor}', {
        params: {
          path: {
            cursor: pageParam,
          },
          query: {
            pageSize: NOTIFICATIONS_PAGE_SIZE,
            sortDirection: 'desc',
          },
        },
      })

      if (response.error) {
        throw response.error
      }

      return response.data as NotificationsPage
    },
    getNextPageParam: lastPage => {
      const items = lastPage.items ?? []
      const lastNotification = items.at(-1)

      if (!lastNotification || !isNotificationFromLastMonth(lastNotification)) return undefined

      return lastNotification.id
    },
  })
}
