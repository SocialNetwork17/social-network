import { client } from '@/shared/api/client'
import {
  SchemaLastMessageViewDto,
  SchemaMessageViewModel,
  SchemaUpdateMessagesStatusDto,
} from '@/shared/api/schema'
import { getErrorMessage } from '@/shared/utils/handleError'
import { MessengerParticipant } from '../model/types'

type SearchUsersResponse = {
  items?: MessengerParticipant[] | MessengerParticipant
}

type MessengerListResponse<T> = {
  items?: T[]
}

const normalizeParticipants = (items?: MessengerParticipant[] | MessengerParticipant) => {
  if (!items) {
    return []
  }

  return Array.isArray(items) ? items : [items]
}

export const messengerApi = {
  async getChats() {
    try {
      const response = await client.GET('/api/v1/messenger', {
        params: {
          query: {
            pageSize: 100,
          },
        },
        credentials: 'include',
      })

      if (response.error) {
        throw response.error
      }

      return ((response.data as MessengerListResponse<SchemaLastMessageViewDto> | undefined)?.items ?? []).filter(
        Boolean
      )
    } catch (error) {
      throw new Error(getErrorMessage(error).message)
    }
  },

  async getMessagesByUser(dialoguePartnerId: number) {
    try {
      const response = await client.GET('/api/v1/messenger/{dialoguePartnerId}', {
        params: {
          path: {
            dialoguePartnerId,
          },
          query: {
            pageSize: 100,
          },
        },
        credentials: 'include',
      })

      if (response.error) {
        throw response.error
      }

      return ((response.data as MessengerListResponse<SchemaMessageViewModel> | undefined)?.items ?? []).filter(
        Boolean
      )
    } catch (error) {
      throw new Error(getErrorMessage(error).message)
    }
  },

  async markMessagesRead(ids: number[]) {
    if (!ids.length) {
      return
    }

    try {
      const response = await client.PUT('/api/v1/messenger', {
        body: { ids } satisfies SchemaUpdateMessagesStatusDto,
        credentials: 'include',
      })

      if (response.error) {
        throw response.error
      }
    } catch (error) {
      throw new Error(getErrorMessage(error).message)
    }
  },

  async searchUsers(search: string) {
    try {
      const response = await client.GET('/api/v1/users', {
        params: {
          query: {
            search,
            pageSize: 10,
            pageNumber: 1,
          },
        },
        credentials: 'include',
      })

      if (response.error) {
        throw response.error
      }

      return normalizeParticipants((response.data as SearchUsersResponse | undefined)?.items)
    } catch (error) {
      throw new Error(getErrorMessage(error).message)
    }
  },

  async getProfileById(userId: number) {
    try {
      const response = await client.GET('/api/v1/public-user/profile/{profileId}', {
        params: {
          path: {
            profileId: userId,
          },
        },
        credentials: 'include',
      })

      if (response.error) {
        throw response.error
      }

      return response.data
    } catch (error) {
      throw new Error(getErrorMessage(error).message)
    }
  },
}
