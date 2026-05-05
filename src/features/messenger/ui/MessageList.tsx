'use client'

import Image from 'next/image'
import { ChatMessage } from '../model/types'
import styles from './MessageList.module.scss'

type Props = {
  currentUserId: number
  messages: ChatMessage[]
  participantAvatarUrl?: string
  participantUsername: string
}

const statusLabel: Record<ChatMessage['status'], string> = {
  pending: 'Sending...',
  sent: 'Sent',
  received: 'Received',
  read: 'Read',
  error: 'Error',
}

const getInitials = (value: string) =>
  value
    .split(/\s+|_|-/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() ?? '')
    .join('')

export const MessageList = ({
  currentUserId,
  messages,
  participantAvatarUrl,
  participantUsername,
}: Props) => {
  return (
    <div className={styles.wrapper}>
      {messages.length === 0 ? (
        <p className={styles.empty}>No messages yet.</p>
      ) : (
        <ul className={styles.list}>
          {messages.map(message => {
            const isOwnMessage = message.senderId === currentUserId
            const itemClassName = isOwnMessage ? `${styles.item} ${styles.own}` : styles.item
            const bubbleClassName =
              message.status === 'error' ? `${styles.bubble} ${styles.error}` : styles.bubble

            return (
              <li key={message.id} className={itemClassName}>
                {!isOwnMessage && (
                  <span className={styles.avatar}>
                    {participantAvatarUrl ? (
                      <Image
                        alt={participantUsername}
                        className={styles.avatarImage}
                        fill
                        sizes="24px"
                        src={participantAvatarUrl}
                      />
                    ) : (
                      getInitials(participantUsername)
                    )}
                  </span>
                )}
                <div className={bubbleClassName}>
                  <p className={styles.text}>{message.text}</p>
                  <div className={styles.meta}>
                    <span>{statusLabel[message.status]}</span>
                    <time dateTime={message.createdAt}>
                      {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </time>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
