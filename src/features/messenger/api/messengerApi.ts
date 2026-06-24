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

type UploadedImageResponse = {
  images?: {
    height?: number
    url: string
    width?: number
  }[]
}

const getImageArea = (image: NonNullable<UploadedImageResponse['images']>[number]) =>
  (image.width ?? 0) * (image.height ?? 0)

const isSquareImage = (image: NonNullable<UploadedImageResponse['images']>[number]) =>
  Boolean(image.width && image.height && image.width === image.height)

const selectBestUploadedImage = (images: UploadedImageResponse['images']) =>
  images
    ?.filter(image => image.url)
    .sort((a, b) => {
      const aIsSquare = isSquareImage(a)
      const bIsSquare = isSquareImage(b)

      if (aIsSquare !== bIsSquare) {
        return aIsSquare ? 1 : -1
      }

      return getImageArea(b) - getImageArea(a)
    })[0]

const normalizeImageFile = (file: File) =>
  new Promise<File>((resolve, reject) => {
    const image = new Image()
    const objectUrl = URL.createObjectURL(file)

    image.onload = () => {
      URL.revokeObjectURL(objectUrl)

      const maxSide = 1280
      const scale = Math.min(1, maxSide / image.naturalWidth, maxSide / image.naturalHeight)
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')

      if (!context) {
        reject(new Error('Image processing failed'))
        return
      }

      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale))
      canvas.height = Math.max(1, Math.round(image.naturalHeight * scale))

      context.fillStyle = '#ffffff'
      context.fillRect(0, 0, canvas.width, canvas.height)
      context.drawImage(image, 0, 0, canvas.width, canvas.height)

      canvas.toBlob(
        blob => {
          if (!blob) {
            reject(new Error('Image processing failed'))
            return
          }

          resolve(new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), { type: 'image/jpeg' }))
        },
        'image/jpeg',
        0.9
      )
    }

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error('The file cannot be processed, please upload another file'))
    }

    image.src = objectUrl
  })

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

      return (
        (response.data as MessengerListResponse<SchemaLastMessageViewDto> | undefined)?.items ?? []
      ).filter(Boolean)
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

      return (
        (response.data as MessengerListResponse<SchemaMessageViewModel> | undefined)?.items ?? []
      ).filter(Boolean)
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

  async uploadImage(file: File) {
    try {
      await client.GET('/api/v1/auth/me').catch(() => null)

      const normalizedFile = await normalizeImageFile(file)
      const formData = new FormData()

      formData.append('file', normalizedFile)

      const response = await client.POST('/api/v1/posts/image', {
        body: formData as any,
        bodySerializer: body => body,
      })

      if (response.error || !response.data) {
        throw response.error
      }

      const uploadedImage = selectBestUploadedImage((response.data as UploadedImageResponse).images)

      if (!uploadedImage?.url) {
        throw new Error('Upload failed')
      }

      return uploadedImage.url
    } catch (error) {
      throw new Error(getErrorMessage(error).message)
    }
  },
}
