'use client'

import { useMutation } from '@tanstack/react-query'
import { client } from '@/shared/api/client'
import { SchemaNewPasswordInputDto } from '@/shared/api/schema'
import { handleError } from '@/shared/utils/handleError'

export const useCreateNewPassword = () => {
  const { mutate, isPending } = useMutation({
    mutationKey: ['auth', 'createNewPassword'],
    mutationFn: async (data: SchemaNewPasswordInputDto) => {
      if (!data.recoveryCode) {
        throw new Error('Recovery code is missing')
      }

      const response = await client.POST('/api/v1/auth/new-password', {
        body: {
          newPassword: data.newPassword,
          recoveryCode: data.recoveryCode,
        },
      })

      if (response.error) {
        handleError(response.error)
      }
      return response.data
    },
  })

  return {
    mutate,
    isPending,
  }
}
