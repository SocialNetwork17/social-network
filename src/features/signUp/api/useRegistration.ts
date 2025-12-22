import { useMutation } from '@tanstack/react-query'
import { client } from '@/shared/api/client'
import { PATH } from '@/shared/constants/routings'
import { handleError } from '@/shared/utils/handleError'
import { RegistrationType } from '@/features/signUp/lib/registrationSchema'

export const useRegistration = () => {
  const mutation = useMutation({
    mutationKey: ['auth', 'registration'],
    mutationFn: async (data: RegistrationType) => {
      const response = await client.POST('/api/v1/auth/registration', {
        body: {
          userName: data.userName,
          email: data.email,
          password: data.password,
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
