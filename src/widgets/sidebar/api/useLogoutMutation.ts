import { useMutation, useQueryClient } from '@tanstack/react-query'
import { client } from '@/shared/api/client'
import { PATH } from '@/shared/constants/routings'
import { tokenService } from '@/shared/api/tokenService'

export const useLogoutMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const res = await client.POST('/api/v1/auth/logout', {
        credentials: 'include', // Важно: отправляем HttpOnly refresh cookie для инвалидации
      })
      return res.data
    },

    onSuccess: () => {
      // 1. Очищаем токен из памяти
      tokenService.clear()
      // 2. Очищаем ВЕСЬ кэш React Query
      queryClient.clear()
      // 3. Редирект на страницу логина
      window.location.href = PATH.SIGN_IN
      // Важно: window.location.href вызывает полную перезагрузку страницы,
      // что гарантирует сброс всего состояния приложения
    },

    // Обработка ошибок при logout
    onError: error => {
      console.error('Logout error:', error)
      // Даже если серверный logout не удался,
      // мы все равно очищаем клиентские данные
      tokenService.clear()
      queryClient.clear()
      window.location.href = PATH.SIGN_IN
    },
  })
}
