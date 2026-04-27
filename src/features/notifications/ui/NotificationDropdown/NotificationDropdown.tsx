import styles from './NotificationDropdown.module.scss'
import {
    isNotificationFromLastMonth,
    useGetNotifications,
} from '@/features/notifications/api/useGetNotifications'
import {NotificationItem} from '@/features/notifications/ui/NotificationItem/NotificationItem'
import {UIEvent, useEffect, useMemo} from 'react'
import {useMarkNotificationsAsRead} from '@/features/notifications/api/useMarkNotificationsAsRead'
import {Spinner} from '@/shared/ui/Spinner/Spinner'


export const NotificationDropdown = () => {
    const {data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading} = useGetNotifications()
    const {mutate: markNotificationsAsRead, isPending: isMarkingAsRead} =
        useMarkNotificationsAsRead()

    const notifications = useMemo(() => {
        const notificationItems = data?.pages.flatMap(page => page.items ?? []) ?? []

        return notificationItems
            .filter(isNotificationFromLastMonth)
            .sort((leftNotification, rightNotification) => {
                return (
                    new Date(rightNotification.createdAt).getTime() -
                    new Date(leftNotification.createdAt).getTime()
                )
            })
    }, [data])

    const unreadNotificationIds = useMemo(() => {
        return notifications
            .filter(notification => !notification.isRead)
            .map(notification => notification.id)
    }, [notifications])

    useEffect(() => {
        if (!unreadNotificationIds.length || isMarkingAsRead) return

        markNotificationsAsRead(unreadNotificationIds)
    }, [isMarkingAsRead, markNotificationsAsRead, unreadNotificationIds])

    const handleScroll = (event: UIEvent<HTMLDivElement>) => {
        const {scrollHeight, scrollTop, clientHeight} = event.currentTarget
        const isNearBottom = scrollHeight - scrollTop - clientHeight < 40

        if (isNearBottom && hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
        }
    }

    const mappedNotifications = notifications.map(notification => {
        return <NotificationItem key={notification.id} notification={notification}/>
    })

    if (isLoading) {
        return (
            <div className={styles.notificationCard}>
                <h3 className={styles.notificationCardTitle}>Уведомления</h3>
                <div className={styles.centeredContent}>
                    <Spinner/>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.notificationCard}>
            <h3 className={styles.notificationCardTitle}>Notifications</h3>
            <div className={styles.notificationCardContent} onScroll={handleScroll}>
                {mappedNotifications.length ? mappedNotifications : null}
                {isFetchingNextPage && (
                    <div className={styles.nextPageLoader}>
                        <Spinner/>
                    </div>
                )}
                {!mappedNotifications.length && (
                    <p className={styles.emptyMessage}>Новых уведомлений нет</p>
                )}
            </div>
        </div>
    )
}
