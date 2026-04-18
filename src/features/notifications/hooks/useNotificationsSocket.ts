'use client'

import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { InfiniteData, useQueryClient } from '@tanstack/react-query'
import { SchemaNotificationViewDto } from '@/shared/api/schema'
import { NotificationsPage } from '@/features/notifications/api/useGetNotifications'

type SocketNotification = SchemaNotificationViewDto & {
  clientId?: string
  notifyAt?: string
}

const normalizeNotification = (notification: SocketNotification): SchemaNotificationViewDto => ({
  id: notification.id,
  message: notification.message,
  isRead: notification.isRead,
  createdAt: notification.createdAt ?? notification.notifyAt ?? new Date().toISOString(),
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

    socket.onAny((eventName, ...args) => {
      console.log('Notifications socket event', eventName, args)
    })

    socket.on('NOTIFICATION', (newNotification: SocketNotification) => {
      const notification = normalizeNotification(newNotification)

      queryClient.setQueryData<InfiniteData<NotificationsPage>>(['notifications'], oldData => {
        if (!oldData) {
          return {
            pageParams: [0],
            pages: [
              {
                pageSize: 10,
                totalCount: 1,
                notReadCount: notification.isRead ? 0 : 1,
                items: [notification],
              },
            ],
          }
        }

        const firstPage = oldData.pages[0]
        const items = firstPage?.items ?? []
        const hasNotification = items.some((item: SchemaNotificationViewDto) => item.id === notification.id)
        const totalCount = firstPage?.totalCount ?? items.length
        const notReadCount = firstPage?.notReadCount ?? items.filter((item: SchemaNotificationViewDto) => !item.isRead).length

        return {
          ...oldData,
          pages: oldData.pages.map((page, index) => {
            if (index !== 0) return page

            return {
              ...page,
              totalCount: totalCount + (hasNotification ? 0 : 1),
              notReadCount: notReadCount + (!notification.isRead && !hasNotification ? 1 : 0),
              items: hasNotification ? items : [notification, ...items],
            }
          }),
        }
      })
    })

    return () => {
      socket.disconnect()
    }
  }, [token, queryClient])
}
