'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { SchemaLastMessageViewDto, SchemaMessageViewModel } from '@/shared/api/schema'
import { messengerApi } from '../api/messengerApi'
import { messengerSocket } from '../api/messengerSocket'
import { Chat, ChatMessage, MessageStatus, MessengerParticipant, MessengerState } from './types'

const createInitialState = (): MessengerState => ({
  chats: [],
  messagesByChat: {},
})

const buildChatId = (participantId: number) => `chat-${participantId}`

const sortChats = (chats: Chat[]) =>
  [...chats].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())

const sortMessages = (messages: ChatMessage[]) =>
  [...messages].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

const upsertChat = (chats: Chat[], chat: Chat) => {
  const nextChats = chats.filter(existingChat => existingChat.id !== chat.id)

  nextChats.push(chat)

  return sortChats(nextChats)
}

const updateChatAvatar = (chats: Chat[], participantId: number, participantAvatarUrl?: string) => {
  if (!participantAvatarUrl) {
    return chats
  }

  return chats.map(chat =>
    chat.participantId === participantId ? { ...chat, participantAvatarUrl } : chat
  )
}

const ensureChatRecord = (chats: Chat[], participant: MessengerParticipant, lastMessage?: string) => {
  const existingChat = chats.find(chat => chat.participantId === participant.id)
  const chatId = existingChat?.id ?? buildChatId(participant.id)

  return {
    id: chatId,
    participantId: participant.id,
    participantUsername: participant.userName,
    participantAvatarUrl: participant.avatars?.[0]?.url ?? existingChat?.participantAvatarUrl,
    lastMessage: lastMessage ?? existingChat?.lastMessage,
    updatedAt: existingChat?.updatedAt ?? new Date().toISOString(),
  } satisfies Chat
}

const mapServerStatus = (status: SchemaMessageViewModel['status']): MessageStatus => {
  switch (status) {
    case 'READ':
      return 'read'
    case 'RECEIVED':
      return 'received'
    case 'SENT':
    default:
      return 'sent'
  }
}

const mapLastMessageToChat = (
  message: SchemaLastMessageViewDto,
  currentUserId: number
): Chat => {
  const participantId = message.ownerId === currentUserId ? message.receiverId : message.ownerId

  return {
    id: buildChatId(participantId),
    participantId,
    participantUsername: message.userName,
    participantAvatarUrl: message.avatars?.[0]?.url,
    lastMessage: message.messageText,
    updatedAt: message.updatedAt,
  }
}

const mapMessageToChatMessage = (message: SchemaMessageViewModel, chatId: string): ChatMessage => ({
  id: String(message.id),
  chatId,
  senderId: message.ownerId,
  receiverId: message.receiverId,
  text: message.messageText,
  createdAt: message.createdAt,
  status: mapServerStatus(message.status),
})

type InitTarget = {
  userId?: number
  username?: string
}

export const useMessenger = (currentUserId?: number) => {
  const [state, setState] = useState<MessengerState>(createInitialState)
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null)
  const [isReady, setIsReady] = useState(false)

  const syncChats = useCallback(async () => {
    if (!currentUserId) {
      setState(createInitialState())
      setSelectedChatId(null)

      return
    }

    const chatsFromServer = (await messengerApi.getChats()).map(message =>
      mapLastMessageToChat(message, currentUserId)
    )
    let mergedChats: Chat[] = []

    setState(prevState => {
      mergedChats = chatsFromServer.reduce((acc, chat) => upsertChat(acc, chat), prevState.chats)

      return {
        chats: sortChats(mergedChats),
        messagesByChat: prevState.messagesByChat,
      }
    })

    setSelectedChatId(prevSelectedChatId => {
      if (prevSelectedChatId && mergedChats.some(chat => chat.id === prevSelectedChatId)) {
        return prevSelectedChatId
      }

      return mergedChats[0]?.id ?? null
    })
  }, [currentUserId])

  const loadMessagesForChat = useCallback(
    async (chat: Chat) => {
      if (!currentUserId) {
        return
      }

      const serverMessages = await messengerApi.getMessagesByUser(chat.participantId)
      const nextMessages = sortMessages(
        serverMessages.map(message => mapMessageToChatMessage(message, chat.id))
      )

      setState(prevState => ({
        ...prevState,
        messagesByChat: {
          ...prevState.messagesByChat,
          [chat.id]: nextMessages,
        },
      }))

      const unreadMessageIds = serverMessages
        .filter(message => message.receiverId === currentUserId && message.status !== 'READ')
        .map(message => message.id)

      if (!unreadMessageIds.length) {
        return
      }

      await messengerApi.markMessagesRead(unreadMessageIds)

      setState(prevState => ({
        ...prevState,
        messagesByChat: {
          ...prevState.messagesByChat,
          [chat.id]: (prevState.messagesByChat[chat.id] ?? nextMessages).map(message =>
            unreadMessageIds.includes(Number(message.id)) ? { ...message, status: 'read' } : message
          ),
        },
      }))
    },
    [currentUserId]
  )

  useEffect(() => {
    let isMounted = true

    setIsReady(false)

    const initialize = async () => {
      try {
        if (!currentUserId) {
          if (isMounted) {
            setState(createInitialState())
            setSelectedChatId(null)
          }

          return
        }

        await syncChats()
      } finally {
        if (isMounted) {
          setIsReady(true)
        }
      }
    }

    void initialize()

    return () => {
      isMounted = false
    }
  }, [currentUserId, syncChats])

  const selectedChat = useMemo(
    () => state.chats.find(chat => chat.id === selectedChatId) ?? null,
    [selectedChatId, state.chats]
  )

  useEffect(() => {
    messengerSocket.connect(currentUserId)

    const unsubscribeChanged = messengerSocket.on('message:changed', ({ message }) => {
      void syncChats()

      const relatedParticipantId =
        message.ownerId === currentUserId ? message.receiverId : message.ownerId

      if (selectedChat?.participantId === relatedParticipantId) {
        void loadMessagesForChat(selectedChat)
      }
    })

    const unsubscribeDeleted = messengerSocket.on('message:deleted', () => {
      void syncChats()

      if (selectedChat) {
        void loadMessagesForChat(selectedChat)
      }
    })

    const unsubscribeError = messengerSocket.on('message:error', () => {
      return
    })

    return () => {
      unsubscribeChanged()
      unsubscribeDeleted()
      unsubscribeError()
      messengerSocket.disconnect()
    }
  }, [currentUserId, loadMessagesForChat, selectedChat, syncChats])

  useEffect(() => {
    if (!selectedChat) {
      return
    }

    void loadMessagesForChat(selectedChat)
  }, [loadMessagesForChat, selectedChat])

  useEffect(() => {
    if (!currentUserId) {
      return
    }

    const intervalId = window.setInterval(() => {
      void syncChats()

      if (selectedChat) {
        void loadMessagesForChat(selectedChat)
      }
    }, 5000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [currentUserId, loadMessagesForChat, selectedChat, syncChats])

  const messages = selectedChat ? state.messagesByChat[selectedChat.id] ?? [] : []

  const selectChat = useCallback((chatId: string) => {
    setSelectedChatId(chatId)
  }, [])

  const openChat = useCallback(
    (participant: MessengerParticipant) => {
      const nextChat = ensureChatRecord(state.chats, participant)

      setState(prevState => ({
        ...prevState,
        chats: upsertChat(prevState.chats, nextChat),
      }))
      setSelectedChatId(nextChat.id)

      return nextChat
    },
    [state.chats]
  )

  const initializeFromTarget = useCallback(
    async (target: InitTarget) => {
      if (!target.userId && !target.username) {
        return
      }

      const existingById = target.userId
        ? state.chats.find(chat => chat.participantId === target.userId)
        : undefined
      const existingByUsername = target.username
        ? state.chats.find(chat => chat.participantUsername === target.username)
        : undefined
      const existingChat = existingById ?? existingByUsername

      if (existingChat) {
        if (!existingChat.participantAvatarUrl && target.userId) {
          try {
            const profile = await messengerApi.getProfileById(target.userId)

            setState(prevState => ({
              ...prevState,
              chats: updateChatAvatar(prevState.chats, target.userId!, profile.avatars?.[0]?.url),
            }))
          } catch {
            return
          }
        }

        setSelectedChatId(existingChat.id)

        return
      }

      if (target.userId) {
        const profile = await messengerApi.getProfileById(target.userId)

        openChat({ id: profile.id, userName: profile.userName, avatars: profile.avatars })

        return
      }

      if (target.username) {
        const users = await messengerApi.searchUsers(target.username)
        const exactUser =
          users.find(user => user.userName.toLowerCase() === target.username?.toLowerCase()) ?? users[0]

        if (exactUser) {
          openChat(exactUser)
        }
      }
    },
    [openChat, state.chats]
  )

  const sendMessage = useCallback(
    async (text: string) => {
      if (!currentUserId || !selectedChat) {
        return false
      }

      const trimmedText = text.trim()

      if (!trimmedText) {
        return false
      }

      try {
        await messengerSocket.sendMessage({
          receiverId: selectedChat.participantId,
          text: trimmedText,
        })
        await syncChats()
        await loadMessagesForChat(selectedChat)

        return true
      } catch {
        return false
      }

    },
    [currentUserId, loadMessagesForChat, selectedChat, syncChats]
  )

  return {
    chats: state.chats,
    initializeFromTarget,
    isReady,
    messages,
    openChat,
    selectedChat,
    selectedChatId,
    selectChat,
    sendMessage,
  }
}
