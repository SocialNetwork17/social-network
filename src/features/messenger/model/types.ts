export type MessageStatus = 'pending' | 'sent' | 'received' | 'read' | 'error'

export type ChatMessage = {
  id: string
  chatId: string
  senderId: number
  receiverId: number
  text: string
  createdAt: string
  status: MessageStatus
}

export type Chat = {
  id: string
  participantId: number
  participantUsername: string
  participantAvatarUrl?: string
  lastMessage?: string
  updatedAt: string
}

export type MessengerParticipant = {
  id: number
  userName: string
  avatars?: {
    url?: string
  }[]
}

export type SendMessagePayload = {
  receiverId: number
  text: string
}

export type SocketMessage = {
  id: number
  ownerId: number
  receiverId: number
  messageText: string
  status: 'SENT' | 'RECEIVED' | 'READ'
  messageType: string
  createdAt: string
  updatedAt: string
}

export type MessageErrorEvent = {
  reason?: string
}

export type MessageChangedEvent = {
  message: SocketMessage
}

export type MessengerSocketEventMap = {
  'message:changed': MessageChangedEvent
  'message:deleted': { id: number }
  'message:error': MessageErrorEvent
}

export type MessengerState = {
  chats: Chat[]
  messagesByChat: Record<string, ChatMessage[]>
}
