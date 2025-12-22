import {useMutation} from '@tanstack/react-query'
import {client} from '@/shared/api/client'
import {PATH} from '@/shared/constants/routings'

export const usePasswordRecoveryMutation = () => {
  const mutation = useMutation({
    mutationKey: ['passwordRecovery'],
    mutationFn: async (email: string) => {
      const response = await client.POST('/api/v1/auth/password-recovery-resending', {
        body: {
          email: email,
          baseUrl: `http://localhost:3000${PATH.RECOVERY_CALLBACK}`,
        },
      })
      return response.data
    },
  })
  return mutation
}
