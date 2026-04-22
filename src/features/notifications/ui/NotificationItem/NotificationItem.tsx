import { SchemaNotificationViewDto } from '@/shared/api/schema'
import { getTimeAgo } from '@/shared/utils/getTimeAgo'
import styles from './NotificationItem.module.scss'

type Props = {
  notification: SchemaNotificationViewDto
}

export const NotificationItem = ({ notification }: Props) => {
  const { message, isRead, createdAt } = notification
  const timeAgo = getTimeAgo(createdAt)

  return (
    <div className={styles.notificationItem}>
      <div>
        <div className={styles.headerWrapper}>
          <p className={styles.newNotificationText}>New notification!</p>
          {!isRead && <span className={styles.newLabel}>New</span>}
        </div>
        <p className={styles.message}>{message}</p>
        <time className={styles.date} dateTime={createdAt}>
          {timeAgo}
        </time>
      </div>
    </div>
  )
}
