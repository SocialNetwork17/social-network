import { useMutation } from '@tanstack/react-query'
import { client } from '@/shared/api/client'
import { PATH } from '@/shared/constants/routings'
import { handleError } from '@/shared/utils/handleError'

export const useResendRegistrationCode = () => {
  const mutation = useMutation({
    mutationKey: ['auth', 'resendRegistrationCode'],
    mutationFn: async (email: string) => {
      const response = await client.POST('/api/v1/auth/registration-email-resending', {
        body: {
          email: email,
          baseUrl: `http://localhost:3000/${PATH.REGISTRATION_CALLBACK}`,
        },
      })
      if (response.error) {
        handleError(response.error)
      }
      return response.data
    },
  })

  return mutation
}
