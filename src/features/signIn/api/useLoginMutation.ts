import { useMutation, useQueryClient } from '@tanstack/react-query'
import { client } from '@/shared/api/client'
import { PATH } from '@/shared/constants/routings'
import { tokenService } from '@/shared/api/tokenService'

type LoginArgs = {
  email: string
  password: string
}

type LoginResponse = {
  accessToken: string
}

export const useLoginMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: LoginArgs) => {
      const res = await client.POST('/api/v1/auth/login', {
        body: data,
        credentials: 'include',
      })

      //Если в ответе есть res.error, выбрасывает исключение с сообщением от сервера или стандартным текстом.
      if (res.error) {
        throw new Error(res.error.messages?.[0]?.message || 'Login failed')
      }

      return res.data as LoginResponse
    },

    //обработка успешного входа
    onSuccess: data => {

      // кладём ТОЛЬКО в память
      tokenService.set(data.accessToken)

      //  обновляем me query с информацией о пользователе
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] })

      // редирект на main
      window.location.href = PATH.MAIN
    },
  })
}
