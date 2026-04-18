import styles from './NotificationBell.module.scss'
import { IconButton } from '@/shared/ui/IconButton/IconButton'
import { NotificationDropdown } from '@/features/notifications/ui/NotificationDropdown/NotificationDropdown'
import { useEffect, useRef, useState } from 'react'
import { useGetNotifications } from '@/features/notifications/api/useGetNotifications'

export const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { data: notifications } = useGetNotifications()
  const notificationRef = useRef<HTMLDivElement | null>(null)

  const notReadCount = notifications?.pages[0]?.notReadCount ?? 0

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (!notificationRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className={styles.iconBox} ref={notificationRef}>
      <IconButton
        onClick={() => setIsOpen(prev => !prev)}
        iconId={'messageBell'}
        size={20}
        viewBox={'0 0 18 20'}
        fill={'white'}
      />
      {notReadCount > 0 && <p className={styles.counterMessage}>{notReadCount}</p>}
      {isOpen && <NotificationDropdown />}
    </div>
  )
}
