'use client'

import Image from 'next/image'
import { Chat, ChatMessage, SendMessageResult } from '../model/types'
import { MessageInput } from './MessageInput'
import { MessageList } from './MessageList'
import styles from './ChatWindow.module.scss'

type Props = {
  currentUserId: number
  messages: ChatMessage[]
  onSendMessage: (text: string, images?: File[]) => Promise<SendMessageResult>
  selectedChat: Chat | null
}

const getInitials = (value: string) =>
  value
    .split(/\s+|_|-/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() ?? '')
    .join('')

export const ChatWindow = ({ currentUserId, messages, onSendMessage, selectedChat }: Props) => {
  if (!selectedChat) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyBadge}>Choose who you would like to talk to</div>
      </div>
    )
  }

  return (
    <section className={styles.window}>
      <header className={styles.header}>
        <span className={styles.avatar}>
          {selectedChat.participantAvatarUrl ? (
            <Image
              alt={selectedChat.participantUsername}
              className={styles.avatarImage}
              fill
              sizes="36px"
              src={selectedChat.participantAvatarUrl}
            />
          ) : (
            getInitials(selectedChat.participantUsername)
          )}
        </span>
        <div className={styles.headerMeta}>
          <h2 className={styles.title}>{selectedChat.participantUsername}</h2>
        </div>
      </header>
      <MessageList
        currentUserId={currentUserId}
        messages={messages}
        participantAvatarUrl={selectedChat.participantAvatarUrl}
        participantUsername={selectedChat.participantUsername}
      />
      <MessageInput onSendMessage={onSendMessage} />
    </section>
  )
}
