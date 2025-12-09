import { useMutation, useQueryClient } from '@tanstack/react-query'
import { client } from '@/shared/api/client'
import { PATH } from '@/shared/constants/routings'
import { tokenService } from '@/shared/api/tokenService'

export const useLogoutMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      // Отправляем запрос на сервер для выхода
      const res = await client.POST('/api/v1/auth/logout', {
        credentials: 'include', // Важно: отправляем HttpOnly refresh cookie для инвалидации
      })

      // Обработка ошибок от сервера
      //   if (res.error) {
      //     throw new Error(res.error.messages?.[0]?.message || "Logout failed");
      //   }

      return res.data
    },

    // Обработка успешного выполнения мутации
    onSuccess: () => {
      // 1. Очищаем токен из памяти
      tokenService.clear()

      // 2. Очищаем ВЕСЬ кэш React Query
      // Вариант A: Очистка всего кэша (простой способ)
      //   queryClient.clear();

      // Вариант B: Целевая очистка только auth-related данных
      queryClient.removeQueries({ queryKey: ['auth'] })
      queryClient.removeQueries({ queryKey: ['me'] })

      // 3. Опционально: сброс любых других хранилищ (если есть)
      // Например: localStorage.clear() - но будьте осторожны!

      // 4. Редирект на страницу логина
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
