'use client'

import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { InfiniteData, useQueryClient } from '@tanstack/react-query'
import { SchemaNotificationViewDto } from '@/shared/api/schema'
import { NotificationsPage } from '@/features/notifications/api/useGetNotifications'

type SocketNotification = Omit<SchemaNotificationViewDto, 'createdAt' | 'isRead'> & {
  clientId?: string
  createdAt?: string
  isRead?: boolean
  notifyAt?: string
}

const NOTIFICATION_PAGE_SIZE = 10

const normalizeNotification = (notification: SocketNotification): SchemaNotificationViewDto => ({
  id: notification.id,
  message: notification.message,
  isRead: notification.isRead ?? false,
  createdAt: notification.createdAt ?? notification.notifyAt ?? new Date().toISOString(),
})

const isSocketNotification = (notification: unknown): notification is SocketNotification => {
  if (!notification || typeof notification !== 'object') return false

  const { id, message, isRead } = notification as Partial<SocketNotification>

  return (
    typeof id === 'number' &&
    typeof message === 'string' &&
    (isRead === undefined || typeof isRead === 'boolean')
  )
}

const getSocketNotifications = (payload: unknown): SocketNotification[] => {
  if (Array.isArray(payload)) {
    return payload.filter(isSocketNotification)
  }

  if (isSocketNotification(payload)) {
    return [payload]
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  const {
    data,
    notification,
    notifications,
    payload: nestedPayload,
  } = payload as {
    data?: unknown
    notification?: unknown
    notifications?: unknown
    payload?: unknown
  }

  return [
    ...getSocketNotifications(data),
    ...getSocketNotifications(notification),
    ...getSocketNotifications(notifications),
    ...getSocketNotifications(nestedPayload),
  ]
}

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

    const addNotificationsToCache = (socketNotifications: SocketNotification[]) => {
      queryClient.setQueryData<InfiniteData<NotificationsPage>>(['notifications'], oldData => {
        const notifications = socketNotifications
          .map(normalizeNotification)
          .filter(
            (notification, index, items) =>
              items.findIndex(item => item.id === notification.id) === index
          )

        if (!oldData) {
          const unreadCount = notifications.filter(notification => !notification.isRead).length

          return {
            pageParams: [0],
            pages: [
              {
                pageSize: NOTIFICATION_PAGE_SIZE,
                totalCount: notifications.length,
                notReadCount: unreadCount,
                items: notifications,
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
        const newNotifications = notifications.filter(notification => !oldIds.has(notification.id))
        const totalCount = firstPage?.totalCount ?? items.length
        const notReadCount =
          firstPage?.notReadCount ??
          items.filter((item: SchemaNotificationViewDto) => !item.isRead).length
        const unreadNewNotificationsCount = newNotifications.filter(
          notification => !notification.isRead
        ).length

        if (!firstPage) {
          return {
            ...oldData,
            pageParams: oldData.pageParams.length ? oldData.pageParams : [0],
            pages: [
              {
                pageSize: NOTIFICATION_PAGE_SIZE,
                totalCount: newNotifications.length,
                notReadCount: unreadNewNotificationsCount,
                items: newNotifications,
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
              totalCount: totalCount + newNotifications.length,
              notReadCount: notReadCount + unreadNewNotificationsCount,
              items: [...newNotifications, ...items],
            }
          }),
        }
      })
    }

    socket.onAny((eventName, ...args) => {
      console.log('Notifications socket event', eventName, args)

      const notifications = args.flatMap(getSocketNotifications)

      if (notifications.length) {
        addNotificationsToCache(notifications)
      }
    })

    return () => {
      socket.disconnect()
    }
  }, [token, queryClient])
}
