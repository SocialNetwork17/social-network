'use client'

import Image from 'next/image'
import { useMemo } from 'react'
import { Icon } from '@/shared/ui/Icon/Icon'
import { formatMessengerDate } from '../lib/formatMessengerDate'
import { ChatMessage } from '../model/types'
import styles from './MessageList.module.scss'

type Props = {
  currentUserId: number
  messages: ChatMessage[]
  participantAvatarUrl?: string
  participantUsername: string
}

type RenderMessage = ChatMessage & {
  caption?: string
  captionCreatedAt?: string
  captionStatus?: ChatMessage['status']
}

const CAPTION_GROUP_TIME_MS = 30_000

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

const renderStatus = (status: ChatMessage['status']) => {
  switch (status) {
    case 'sent':
      return <Icon iconId={'checkmark-outline'} size={16} viewBox={'0 0 16 16'} />
    case 'received':
      return <Icon iconId={'done-all-outline'} size={16} viewBox={'0 0 16 16'} />
    case 'read':
      return <Icon iconId={'done-all-outline'} size={16} viewBox={'0 0 16 16'} fill={'#0031ff'} />
    default:
      return statusLabel[status]
  }
}

const isStorageImageUrl = (value: string) => {
  try {
    const url = new URL(value)
    const isKnownStorageHost =
      url.hostname.includes('storage.yandexcloud.net') ||
      url.hostname.includes('staging-it-incubator.s3.eu-central-1.amazonaws.com')
    const isUploadedImagePath =
      url.pathname.includes('users-inctagram') ||
      url.pathname.includes('trainee-instagram-api/Image') ||
      url.pathname.includes('-images-')

    return isKnownStorageHost && isUploadedImagePath
  } catch {
    return false
  }
}

const isImageMessage = (message: ChatMessage) =>
  message.messageType === 'IMAGE' ||
  message.text.startsWith('data:image/') ||
  isStorageImageUrl(message.text)

const shouldGroupAsCaption = (imageMessage: ChatMessage, captionMessage: ChatMessage) => {
  if (!isImageMessage(imageMessage) || isImageMessage(captionMessage)) {
    return false
  }

  const createdAtDiff = Math.abs(
    new Date(captionMessage.createdAt).getTime() - new Date(imageMessage.createdAt).getTime()
  )

  return imageMessage.senderId === captionMessage.senderId && createdAtDiff <= CAPTION_GROUP_TIME_MS
}

const buildRenderMessages = (messages: ChatMessage[]): RenderMessage[] => {
  const renderMessages: RenderMessage[] = []

  for (let index = 0; index < messages.length; index += 1) {
    const message = messages[index]
    const nextMessage = messages[index + 1]

    if (!message) {
      continue
    }

    if (nextMessage && shouldGroupAsCaption(message, nextMessage)) {
      renderMessages.push({
        ...message,
        caption: nextMessage.text,
        captionCreatedAt: nextMessage.createdAt,
        captionStatus: nextMessage.status,
      })
      index += 1
      continue
    }

    renderMessages.push(message)
  }

  return renderMessages
}

export const MessageList = ({
  currentUserId,
  messages,
  participantAvatarUrl,
  participantUsername,
}: Props) => {
  const renderMessages = useMemo(() => buildRenderMessages(messages), [messages])

  return (
    <div className={styles.wrapper}>
      {messages.length === 0 ? (
        <p className={styles.empty}>No messages yet.</p>
      ) : (
        <ul className={styles.list}>
          {renderMessages.map(message => {
            const isOwnMessage = message.senderId === currentUserId
            const itemClassName = isOwnMessage ? `${styles.item} ${styles.own}` : styles.item
            const imageMessage = isImageMessage(message)
            const bubbleClassName = imageMessage
                ? `${styles.bubble} ${styles.imageBubble} ${message.caption ? styles.imageBubbleWithCaption : ''}`
                : message.status === 'error'
                    ? `${styles.bubble} ${styles.error}`
                    : styles.bubble
            const messageCreatedAt = message.captionCreatedAt ?? message.createdAt
            const messageStatus = message.captionStatus ?? message.status

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
                  {imageMessage ? (
                    <>
                      <img
                        alt={'Message image'}
                        className={styles.messageImage}
                        src={message.text}
                      />
                      {message.caption && <p className={styles.caption}>{message.caption}</p>}
                    </>
                  ) : (
                    <p className={styles.text}>
                      {isOwnMessage ? `You: ${message.text}` : message.text}
                    </p>
                  )}
                  <div className={styles.meta}>
                    <time dateTime={messageCreatedAt}>
                      {formatMessengerDate(messageCreatedAt)}
                    </time>
                    {isOwnMessage && (
                      <span className={styles.status}>{renderStatus(messageStatus)}</span>
                    )}
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
