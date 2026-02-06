//глобальное хранилище для accessToken.

let _accessToken: string | null = null
//Подчёркивание _ — это просто соглашение между разработчиками - эту переменную не трогать напрямую

export const tokenService = {
  // Метод для получения текущего токена
  get() {
    // На клиенте: берем из cookies или памяти
    if (typeof window !== 'undefined') {
      if (_accessToken) return _accessToken

      // Или из cookies (для SSR)
      const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('accessToken='))
        ?.split('=')[1]

      return cookieValue || null
    }
    // На сервере: только через next/headers
    return null
  },
  // Метод для установки нового токена
  set(token: string | null) {
    _accessToken = token

    // Также сохраняем в cookie (опционально)
    if (token && typeof window !== 'undefined') {
      document.cookie = `accessToken=${token}; path=/; max-age=86400` // 24 часа
    }
  },
  // Метод для очистки токена
  clear() {
    _accessToken = null

    // Очищаем cookie
    if (typeof window !== 'undefined') {
      document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }
  },
}
