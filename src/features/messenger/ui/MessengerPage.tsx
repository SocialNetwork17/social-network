'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMeQuery } from '@/shared/api/useMeQuery'
import { PATH } from '@/shared/constants/routings'
import { Loader } from '@/shared/ui/Loader/Loader'
import { useMessenger } from '../model/useMessenger'
import { useUserSearchQuery } from '../model/useUserSearchQuery'
import { ChatList } from './ChatList'
import { ChatWindow } from './ChatWindow'
import styles from './MessengerPage.module.scss'

export const MessengerPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: me, isLoading } = useMeQuery()
  const [searchValue, setSearchValue] = useState('')
  const [initializedTarget, setInitializedTarget] = useState<string | null>(null)

  const messenger = useMessenger(me?.userId)
  const trimmedSearch = searchValue.trim()
  const { data: users = [], isFetching: isSearchLoading } = useUserSearchQuery(
    trimmedSearch,
    Boolean(me) && trimmedSearch.length >= 2
  )

  useEffect(() => {
    if (!isLoading && !me) {
      router.replace(PATH.SIGN_IN)
    }
  }, [isLoading, me, router])

  useEffect(() => {
    if (!me || !messenger.isReady || !searchParams) {
      return
    }

    const userIdParam = searchParams.get('userId')
    const usernameParam = searchParams.get('username')
    const targetKey = `${userIdParam ?? ''}:${usernameParam ?? ''}`

    if (!userIdParam && !usernameParam) {
      return
    }

    if (initializedTarget === targetKey) {
      return
    }

    const participantId = userIdParam ? Number(userIdParam) : undefined

    if (participantId === me.userId) {
      setInitializedTarget(targetKey)
      return
    }

    messenger
      .initializeFromTarget({
        userId: Number.isFinite(participantId) ? participantId : undefined,
        username: usernameParam ?? undefined,
      })
      .catch(() => {
        return
      })
      .finally(() => {
        setInitializedTarget(targetKey)
      })
  }, [initializedTarget, me, messenger, searchParams])

  if (isLoading || !messenger.isReady) {
    return <Loader />
  }

  if (!me) {
    return <Loader />
  }

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Messenger</h1>
        </div>
      </div>

      <div className={styles.layout}>
        <ChatList
          chats={messenger.chats}
          currentUserId={me.userId}
          isSearchLoading={isSearchLoading}
          onOpenChat={messenger.openChat}
          onSelectChat={messenger.selectChat}
          searchResults={users.filter(user => user.id !== me.userId)}
          searchValue={trimmedSearch}
          searchValueRaw={searchValue}
          selectedChatId={messenger.selectedChatId}
          setSearchValue={setSearchValue}
        />
        <ChatWindow
          currentUserId={me.userId}
          messages={messenger.messages}
          onSendMessage={messenger.sendMessage}
          selectedChat={messenger.selectedChat}
        />
      </div>
    </section>
  )
}
