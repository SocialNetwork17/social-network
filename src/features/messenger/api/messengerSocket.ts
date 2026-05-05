'use client'

import { io, Socket } from 'socket.io-client'
import { tokenService } from '@/shared/api/tokenService'
import { MessageErrorEvent, MessengerSocketEventMap, SendMessagePayload, SocketMessage } from '../model/types'

type EventName = keyof MessengerSocketEventMap
type EventHandler<K extends EventName> = (payload: MessengerSocketEventMap[K]) => void

type PendingMessage = {
  receiverId: number
  reject: (error: Error) => void
  resolve: (message: SocketMessage) => void
  text: string
}

class MessengerSocket {
  private currentUserId?: number

  private listeners: {
    [K in EventName]: Set<EventHandler<K>>
  } = {
    'message:changed': new Set(),
    'message:deleted': new Set(),
    'message:error': new Set(),
  }

  private pendingMessages: PendingMessage[] = []

  private socket: Socket | null = null

  connect(currentUserId?: number) {
    const accessToken = tokenService.get()

    this.currentUserId = currentUserId

    if (!accessToken) {
      return
    }

    if (this.socket?.connected) {
      return
    }

    this.socket?.disconnect()

    this.socket = io('https://inctagram.work', {
      autoConnect: true,
      query: {
        accessToken,
      },
      transports: ['websocket'],
    })

    this.socket.on('receive-message', (message: SocketMessage) => {
      this.resolvePending(message)
      this.emit('message:changed', { message })
    })

    this.socket.on('message-send', (message: SocketMessage, callback?: (payload: object) => void) => {
      callback?.({
        message,
        receiverId: this.currentUserId ?? message.receiverId,
      })

      this.emit('message:changed', { message })
    })

    this.socket.on('message-deleted', (messageId: number) => {
      this.emit('message:deleted', { id: messageId })
    })

    this.socket.on('error', (payload: { error?: string; message?: string } | string) => {
      const reason =
        typeof payload === 'string' ? payload : payload?.message || payload?.error || 'Socket error'

      if (this.pendingMessages.length) {
        const pendingMessage = this.pendingMessages.shift()

        pendingMessage?.reject(new Error(reason))
      }

      this.emit('message:error', { reason })
    })
  }

  disconnect() {
    this.socket?.disconnect()
    this.socket = null
  }

  on<K extends EventName>(event: K, handler: EventHandler<K>) {
    const typedListeners = this.listeners[event] as Set<EventHandler<K>>

    typedListeners.add(handler)

    return () => {
      typedListeners.delete(handler)
    }
  }

  async sendMessage(payload: SendMessagePayload) {
    return new Promise<void>((resolve, reject) => {
      if (!this.socket?.connected) {
        reject(new Error('Messenger socket is not connected'))

        return
      }

      const trimmedText = payload.text.trim()

      if (!trimmedText) {
        const errorPayload: MessageErrorEvent = {
          reason: 'Empty messages are not allowed',
        }

        this.emit('message:error', errorPayload)
        reject(new Error(errorPayload.reason))

        return
      }

      this.pendingMessages.push({
        receiverId: payload.receiverId,
        reject,
        resolve: () => resolve(),
        text: trimmedText,
      })

      this.socket.emit('receive-message', {
        message: trimmedText,
        receiverId: payload.receiverId,
      })
    })
  }

  private resolvePending(message: SocketMessage) {
    if (message.ownerId !== this.currentUserId) {
      return
    }

    const pendingMessageIndex = this.pendingMessages.findIndex(
      pendingMessage =>
        pendingMessage.receiverId === message.receiverId && pendingMessage.text === message.messageText
    )

    if (pendingMessageIndex === -1) {
      return
    }

    const [pendingMessage] = this.pendingMessages.splice(pendingMessageIndex, 1)

    if (!pendingMessage) {
      return
    }

    pendingMessage.resolve(message)
  }

  private emit<K extends EventName>(event: K, payload: MessengerSocketEventMap[K]) {
    const typedListeners = this.listeners[event] as Set<EventHandler<K>>

    typedListeners.forEach(listener => {
      listener(payload)
    })
  }
}

export const messengerSocket = new MessengerSocket()
