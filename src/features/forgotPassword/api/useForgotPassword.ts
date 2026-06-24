'use client'

import { useMutation } from '@tanstack/react-query'
import { client } from '@/shared/api/client'
import { ForgotPasswordInput } from '@/features/forgotPassword/lib/forgotPasswordSchema'
import { PATH } from '@/shared/constants/routings'

export const useForgotPassword = () => {
  const {
    mutate,
    reset: resetMutation,
    isPending,
  } = useMutation({
    mutationKey: ['forgotPassword'],
    mutationFn: async (body: { data: ForgotPasswordInput; recaptchaToken: string }) => {
      if (!body.recaptchaToken) {
        throw new Error('reCAPTCHA verification required')
      }

      const response = await client.POST('/api/v1/auth/password-recovery', {
        body: {
          email: body.data.email,
          baseUrl: `${process.env.NEXT_PUBLIC_BASE_DOMAIN}${PATH.RECOVERY_CALLBACK}`,
          recaptcha: body.recaptchaToken,
        },
      })

      if (response.error) {
        throw response.error
      }
      return response.data
    },
  })

  return {
    mutate,
    resetMutation,
    isPending,
  }
}
