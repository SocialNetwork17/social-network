'use client'

import { io, Socket } from 'socket.io-client'
import { refreshAccessToken } from '@/shared/api/client'
import { tokenService } from '@/shared/api/tokenService'
import {
  MessageErrorEvent,
  MessengerSocketEventMap,
  SendMessagePayload,
  SocketMessage,
} from '../model/types'

type EventName = keyof MessengerSocketEventMap
type EventHandler<K extends EventName> = (payload: MessengerSocketEventMap[K]) => void

type PendingMessage = {
  matchStrategy: 'exact' | 'receiver'
  receiverId: number
  reject: (error: Error) => void
  resolve: (message: SocketMessage) => void
  text: string
  timeoutId: ReturnType<typeof setTimeout>
}

class MessengerSocket {
  private currentUserId?: number

  private socketAccessToken: string | null = null

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

    if (this.socket?.connected && this.socketAccessToken === accessToken) {
      return
    }

    this.socket?.disconnect()
    this.socketAccessToken = accessToken

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

    this.socket.on(
      'message-send',
      (message: SocketMessage, callback?: (payload: object) => void) => {
        this.resolvePending(message, { ignoreOwner: true })

        callback?.({
          message,
          receiverId: this.currentUserId ?? message.receiverId,
        })

        this.emit('message:changed', { message })
      }
    )

    this.socket.on('message-deleted', (messageId: number) => {
      this.emit('message:deleted', { id: messageId })
    })

    this.socket.on('error', (payload: { error?: string; message?: string } | string) => {
      const reason =
        typeof payload === 'string' ? payload : payload?.message || payload?.error || 'Socket error'

      if (this.pendingMessages.length) {
        const pendingMessage = this.pendingMessages.shift()

        if (pendingMessage) {
          clearTimeout(pendingMessage.timeoutId)
          pendingMessage.reject(new Error(reason))
        }
      }

      this.emit('message:error', { reason })
    })
  }

  disconnect() {
    this.socket?.disconnect()
    this.socket = null
    this.socketAccessToken = null
  }

  on<K extends EventName>(event: K, handler: EventHandler<K>) {
    const typedListeners = this.listeners[event] as Set<EventHandler<K>>

    typedListeners.add(handler)

    return () => {
      typedListeners.delete(handler)
    }
  }

  async sendMessage(payload: SendMessagePayload) {
    await this.ensureConnected()

    return new Promise<void>((resolve, reject) => {
      const socket = this.socket

      if (!socket?.connected) {
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

      const timeoutId = setTimeout(() => {
        const pendingMessageIndex = this.pendingMessages.findIndex(
          pendingMessage =>
            pendingMessage.receiverId === payload.receiverId && pendingMessage.text === trimmedText
        )

        if (pendingMessageIndex === -1) {
          return
        }

        this.pendingMessages.splice(pendingMessageIndex, 1)
        reject(new Error('Message sending timeout'))
      }, 10000)

      this.pendingMessages.push({
        matchStrategy: payload.matchStrategy ?? 'exact',
        receiverId: payload.receiverId,
        reject,
        resolve: () => {
          clearTimeout(timeoutId)
          resolve()
        },
        text: trimmedText,
        timeoutId,
      })

      socket.emit(
        'receive-message',
        {
          message: trimmedText,
          messageType: payload.messageType,
          receiverId: payload.receiverId,
        },
        (ack?: { message?: SocketMessage; receiverId?: number }) => {
          if (ack?.message) {
            this.resolvePending(ack.message, { ignoreOwner: true })
            return
          }

          this.resolvePendingByReceiver(ack?.receiverId ?? payload.receiverId)
        }
      )
    })
  }

  private async ensureConnected() {
    let accessToken = tokenService.get()

    if (!accessToken) {
      accessToken = await refreshAccessToken()
    }

    if (!this.socket?.connected || this.socketAccessToken !== accessToken) {
      this.connect(this.currentUserId)
    }

    if (this.socket?.connected) {
      return
    }

    await new Promise<void>((resolve, reject) => {
      const socket = this.socket

      if (!socket) {
        reject(new Error('Messenger socket is not connected'))
        return
      }

      const timeoutId = setTimeout(() => {
        socket.off('connect', handleConnect)
        socket.off('connect_error', handleConnectError)
        reject(new Error('Messenger socket connection timeout'))
      }, 5000)

      const handleConnect = () => {
        clearTimeout(timeoutId)
        socket.off('connect_error', handleConnectError)
        resolve()
      }

      const handleConnectError = () => {
        clearTimeout(timeoutId)
        socket.off('connect', handleConnect)
        reject(new Error('Messenger socket is not connected'))
      }

      socket.once('connect', handleConnect)
      socket.once('connect_error', handleConnectError)
    })
  }

  private resolvePending(message: SocketMessage, options: { ignoreOwner?: boolean } = {}) {
    if (!options.ignoreOwner && message.ownerId !== this.currentUserId) {
      return
    }

    const pendingMessageIndex = this.pendingMessages.findIndex(
      pendingMessage =>
        (pendingMessage.receiverId === message.receiverId ||
          pendingMessage.receiverId === message.ownerId) &&
        (pendingMessage.matchStrategy === 'receiver' || pendingMessage.text === message.messageText)
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

  private resolvePendingByReceiver(receiverId: number) {
    const pendingMessageIndex = this.pendingMessages.findIndex(
      pendingMessage => pendingMessage.receiverId === receiverId
    )

    if (pendingMessageIndex === -1) {
      return
    }

    const [pendingMessage] = this.pendingMessages.splice(pendingMessageIndex, 1)

    if (!pendingMessage) {
      return
    }

    pendingMessage.resolve({} as SocketMessage)
  }

  private emit<K extends EventName>(event: K, payload: MessengerSocketEventMap[K]) {
    const typedListeners = this.listeners[event] as Set<EventHandler<K>>

    typedListeners.forEach(listener => {
      listener(payload)
    })
  }
}

export const messengerSocket = new MessengerSocket()
