import { SchemaNotificationViewDto } from '@/shared/api/schema'
import styles from './NotificationItem.module.scss'

type Props = {
  notification: SchemaNotificationViewDto
}

export const NotificationItem = ({ notification }: Props) => {
  const { message, isRead, createdAt } = notification

  return (
    <div className={styles.notificationItem}>
      <div>
        <p className={styles.message}>{message}</p>
        <time className={styles.date} dateTime={createdAt}>
          {new Date(createdAt).toLocaleString()}
        </time>
      </div>
      {!isRead && <span className={styles.newLabel}>New</span>}
    </div>
  )
}
