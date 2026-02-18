import { EmptyErrorResponse, ErrorWithMessageResponse, ServerError } from '@/shared/types/types'

export function handleError(responseError: unknown): ServerError {
  const err = responseError as any

  // Валидационные ошибки (400)
  if (Array.isArray(err?.messages) && err.messages.length > 0) {
    return {
      type: 'validation',
      statusCode: err.statusCode || 400,
      field: err.messages[0].field,
      message: err.messages[0].message,
    } as ErrorWithMessageResponse
  }

  // Ошибка авторизации (401)
  if (err?.statusCode === 401 || err?.status === 401 || err?.message?.includes('Authorization')) {
    return {
      type: 'general',
      statusCode: 401,
      message: err.message || err.error || 'Unauthorized',
    } as EmptyErrorResponse
  }

  // Ошибка доступа (403)
  if (err?.statusCode === 403 || err?.status === 403 || err?.message?.includes('Forbidden')) {
    return {
      type: 'general',
      statusCode: 403,
      message: err.message || err.error || 'Forbidden',
    } as EmptyErrorResponse
  }

  // Ошибка "не найдено" (404)
  if (err?.statusCode === 404 || err?.status === 404 || err?.message?.includes('Not Found')) {
    return {
      type: 'general',
      statusCode: 404,
      message: err.message || err.error || 'Not Found',
    } as EmptyErrorResponse
  }

  // Слишком много запросов (429)
  if (err?.statusCode === 429 || err?.status === 429 || err?.message?.includes('Too Many Requests')) {
    return {
      type: 'general',
      statusCode: 429,
      message: err.message || err.error || 'Too Many Requests',
    } as EmptyErrorResponse
  }

  // Внутренняя ошибка сервера (500+)
  if (err?.statusCode >= 500 || err?.status >= 500) {
    return {
      type: 'general',
      statusCode: err.statusCode || err.status || 500,
      message: err.message || err.error || 'Internal Server Error',
    } as EmptyErrorResponse
  }

  // Общая ошибка клиента (400-499, кроме уже обработанных)
  if (err?.statusCode >= 400 && err?.statusCode < 500) {
    return {
      type: 'general',
      statusCode: err.statusCode,
      message: err.message || err.error || 'Client Error',
    } as EmptyErrorResponse
  }

  // Ошибки сети (не HTTP ошибки)
  if (err?.message?.includes('Network') || err?.message?.includes('network')) {
    return {
      type: 'general',
      statusCode: 0, // Специальный код для сетевых ошибок
      message: 'Network error. Please check your connection.',
    } as EmptyErrorResponse
  }

  // Ошибки с сообщением
  if (err?.message && typeof err.message === 'string') {
    return {
      type: 'general',
      statusCode: err.statusCode || err.status || 500,
      message: err.message,
    } as EmptyErrorResponse
  }

  // Ошибки из поля error
  if (err?.error && typeof err.error === 'string') {
    return {
      type: 'general',
      statusCode: err.statusCode || 500,
      message: err.error,
    } as EmptyErrorResponse
  }

  // Неизвестные ошибки
  return {
    type: 'general',
    statusCode: 500,
    message: 'Unknown server error',
  } as EmptyErrorResponse
}

// функция для получения статус кода
export function getErrorStatusCode(error: unknown): number {
  const serverError = handleError(error)
  return serverError.statusCode
}

// функция для получения сообщения об ошибке
export function getErrorMessage(error: unknown): string {
  const serverError = handleError(error)
  return serverError.message
}