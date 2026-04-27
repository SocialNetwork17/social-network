//глобальное хранилище для accessToken.

let _accessToken: string | null = null
const listeners = new Set<(token: string | null) => void>()

const notifyListeners = () => {
  listeners.forEach(listener => listener(_accessToken))
}
//Подчёркивание _ — это просто соглашение между разработчиками - эту переменную не трогать напрямую

export const tokenService = {
  // Метод для получения текущего токена
  get() {
    return _accessToken
  },
  // Метод для установки нового токена
  set(token: string | null) {
    _accessToken = token
    notifyListeners()
  },
  // Метод для очистки токена
  clear() {
    _accessToken = null
    notifyListeners()
  },
  subscribe(listener: (token: string | null) => void) {
    listeners.add(listener)

    return () => {
      listeners.delete(listener)
    }
  },
}
