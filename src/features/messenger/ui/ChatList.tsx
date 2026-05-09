'use client'

import Image from 'next/image'
import { Icon } from '@/shared/ui/Icon/Icon'
import { formatMessengerDate } from '../lib/formatMessengerDate'
import { Chat, MessengerParticipant } from '../model/types'
import styles from './ChatList.module.scss'

type Props = {
  chats: Chat[]
  currentUserId: number
  isSearchLoading: boolean
  onOpenChat: (participant: MessengerParticipant) => Chat
  onSelectChat: (chatId: string) => void
  searchResults: MessengerParticipant[]
  searchValue: string
  searchValueRaw: string
  selectedChatId: string | null
  setSearchValue: (value: string) => void
}

const getInitials = (value: string) =>
  value
    .split(/\s+|_|-/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() ?? '')
    .join('')

const getChatPreview = (chat: Chat, currentUserId: number) => {
  if (!chat.lastMessage) {
    return 'Start conversation'
  }

  return chat.lastMessageSenderId === currentUserId ? `You: ${chat.lastMessage}` : chat.lastMessage
}

export const ChatList = ({
  chats,
  currentUserId,
  isSearchLoading,
  onOpenChat,
  onSelectChat,
  searchResults,
  searchValue,
  searchValueRaw,
  selectedChatId,
  setSearchValue,
}: Props) => {
  const hasSearch = searchValue.length >= 2

  return (
    <aside className={styles.sidebar}>
      <div className={styles.searchBox}>
        <Icon iconId={'search'} size={18} className={styles.searchIcon} />
        <input
          className={styles.searchInput}
          onChange={event => setSearchValue(event.currentTarget.value)}
          placeholder={'Input search'}
          value={searchValueRaw}
        />
      </div>

      <div className={styles.scrollArea}>
        {hasSearch && isSearchLoading && <p className={styles.empty}>Searching users...</p>}
        {hasSearch && !isSearchLoading && searchResults.length === 0 && (
          <p className={styles.empty}>No users found.</p>
        )}
        {hasSearch && searchResults.length > 0 && (
          <ul className={styles.listSearch}>
            {searchResults
              .filter(user => user.id !== currentUserId)
              .map(user => (
                <li key={user.id}>
                  <button
                    type={'button'}
                    className={styles.searchItem}
                  onClick={() => onSelectChat(onOpenChat(user).id)}
                >
                    <span className={styles.avatar}>
                      {user.avatars?.[0]?.url ? (
                        <Image
                          alt={user.userName}
                          className={styles.avatarImage}
                          fill
                          sizes="38px"
                          src={user.avatars[0].url}
                        />
                      ) : (
                        getInitials(user.userName)
                      )}
                    </span>
                    <span className={styles.content}>
                      <span className={styles.username}>{user.userName}</span>
                      <span className={styles.preview}>Open chat</span>
                    </span>
                  </button>
                </li>
              ))}
          </ul>
        )}

        {chats.length === 0 ? (
          <p className={styles.empty}>No chats yet. Open one from a profile or search a username.</p>
        ) : (
          <ul className={styles.list}>
            {chats.map(chat => (
              <li key={chat.id}>
                <button
                  type={'button'}
                  className={chat.id === selectedChatId ? `${styles.chatItem} ${styles.active}` : styles.chatItem}
                  onClick={() => onSelectChat(chat.id)}
                >
                  <span className={styles.avatar}>
                    {chat.participantAvatarUrl ? (
                      <Image
                        alt={chat.participantUsername}
                        className={styles.avatarImage}
                        fill
                        sizes="38px"
                        src={chat.participantAvatarUrl}
                      />
                    ) : (
                      getInitials(chat.participantUsername)
                    )}
                  </span>
                  <span className={styles.content}>
                    <span className={styles.metaLine}>
                      <span className={styles.username}>{chat.participantUsername}</span>
                      <span className={styles.time}>{formatMessengerDate(chat.updatedAt)}</span>
                    </span>
                    <span className={styles.preview}>{getChatPreview(chat, currentUserId)}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  )
}
