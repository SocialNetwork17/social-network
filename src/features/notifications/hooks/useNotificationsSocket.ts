'use client'

import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { InfiniteData, useQueryClient } from '@tanstack/react-query'
import { SchemaNotificationViewDto } from '@/shared/api/schema'
import { NotificationsPage } from '@/features/notifications/api/useGetNotifications'

const NOTIFICATION_PAGE_SIZE = 10
const NOTIFICATION_SOCKET_EVENT = 'notifications'

type SocketNotification = SchemaNotificationViewDto & {
  clientId: string
  eventType: number
  notifyAt: string
}

const normalizeNotification = (notification: SocketNotification): SchemaNotificationViewDto => ({
  id: notification.id,
  message: notification.message,
  isRead: notification.isRead,
  createdAt: notification.createdAt,
})

export const useNotificationsSocket = (token: string | null) => {
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!token) return

    const socket = io('https://inctagram.work', {
      query: {
        accessToken: token,
      },
    })

    socket.on('connect', () => {
      console.log('Notifications socket connected', socket.id)
    })

    socket.on('connect_error', error => {
      console.error('Notifications socket connection error', error.message)
    })

    socket.on('disconnect', reason => {
      console.log('Notifications socket disconnected', reason)
    })

    const addNotificationToCache = (socketNotification: SocketNotification) => {
      queryClient.setQueryData<InfiniteData<NotificationsPage>>(['notifications'], oldData => {
        const notification = normalizeNotification(socketNotification)

        if (!oldData) {
          return {
            pageParams: [0],
            pages: [
              {
                pageSize: NOTIFICATION_PAGE_SIZE,
                totalCount: 1,
                notReadCount: notification.isRead ? 0 : 1,
                items: [notification],
              },
            ],
          }
        }

        const firstPage = oldData.pages[0]
        const items = firstPage?.items ?? []
        const oldIds = new Set(
          oldData.pages
            .flatMap(page => page.items ?? [])
            .map((item: SchemaNotificationViewDto) => item.id)
        )
        const hasNotification = oldIds.has(notification.id)
        const totalCount = firstPage?.totalCount ?? items.length
        const notReadCount =
          firstPage?.notReadCount ??
          items.filter((item: SchemaNotificationViewDto) => !item.isRead).length
        const unreadNewNotificationCount = !notification.isRead && !hasNotification ? 1 : 0

        if (!firstPage) {
          return {
            ...oldData,
            pageParams: oldData.pageParams.length ? oldData.pageParams : [0],
            pages: [
              {
                pageSize: NOTIFICATION_PAGE_SIZE,
                totalCount: hasNotification ? 0 : 1,
                notReadCount: unreadNewNotificationCount,
                items: hasNotification ? [] : [notification],
              },
            ],
          }
        }

        return {
          ...oldData,
          pages: oldData.pages.map((page, index) => {
            if (index !== 0) return page

            return {
              ...page,
              totalCount: totalCount + (hasNotification ? 0 : 1),
              notReadCount: notReadCount + unreadNewNotificationCount,
              items: hasNotification ? items : [notification, ...items],
            }
          }),
        }
      })
    }

    socket.on(NOTIFICATION_SOCKET_EVENT, (notification: SocketNotification) => {
      console.log('Notifications socket event', NOTIFICATION_SOCKET_EVENT, notification)
      addNotificationToCache(notification)
    })

    return () => {
      socket.disconnect()
    }
  }, [token, queryClient])
}
