import styles from "./NotificationDropdown.module.scss"
import {useGetNotifications} from "@/features/notifications/api/useGetNotifications";
import {NotificationItem} from "@/features/notifications/ui/NotificationItem/NotificationItem";

export const NotificationDropdown = () => {

    const {data: notifications} = useGetNotifications()


    const mappedNotifications = notifications?.items?.map(notification => {
        return (
            <NotificationItem key={notification.id} notification={notification} />
        )
    })

    return (
        <div className={styles.notificationCard}>
            <h3 className={styles.notificationCardTitle}>Уведомления</h3>
            <div className={styles.notificationCardContent}>
                {mappedNotifications}
            </div>
        </div>
    );
};