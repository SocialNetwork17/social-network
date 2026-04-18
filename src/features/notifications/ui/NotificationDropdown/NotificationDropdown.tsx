import styles from './NotificationDropdown.module.scss'
import {
  isNotificationFromLastMonth,
  useGetNotifications,
} from '@/features/notifications/api/useGetNotifications'
import { NotificationItem } from '@/features/notifications/ui/NotificationItem/NotificationItem'
import { UIEvent, useEffect, useMemo } from 'react'
import {useMarkNotificationsAsRead} from "@/features/notifications/api/useMarkNotificationsAsRead";
import {Spinner} from "@/shared/ui/Spinner/Spinner";
import {Loader} from "@/shared/ui/Loader/Loader";

export const NotificationDropdown = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useGetNotifications()
  const { mutate: markNotificationsAsRead, isPending: isMarkingAsRead } = useMarkNotificationsAsRead()

  const notifications = useMemo(() => {
    return data?.pages.flatMap(page => page.items ?? []).filter(isNotificationFromLastMonth) ?? []
  }, [data])

  const unreadNotificationIds = useMemo(() => {
    return notifications.filter(notification => !notification.isRead).map(notification => notification.id)
  }, [notifications])

  useEffect(() => {
    if (!unreadNotificationIds.length || isMarkingAsRead) return

    markNotificationsAsRead(unreadNotificationIds)
  }, [isMarkingAsRead, markNotificationsAsRead, unreadNotificationIds])

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = event.currentTarget
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 40

    if (isNearBottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  const mappedNotifications = notifications.map(notification => {
    return <NotificationItem key={notification.id} notification={notification} />
  })

  return (
    <div className={styles.notificationCard}>
      <h3 className={styles.notificationCardTitle}>Уведомления</h3>
      <div className={styles.notificationCardContent} onScroll={handleScroll}>
        {isLoading && <p className={styles.emptyMessage}><Loader/></p>}
        {!isLoading && mappedNotifications.length ? mappedNotifications : null}
        {isFetchingNextPage && <p className={styles.emptyMessage}>Загрузка...</p>}
        {!isLoading && !mappedNotifications.length && (
          <p className={styles.emptyMessage}>Новых уведомлений нет</p>
        )}
      </div>
    </div>
  )
}
