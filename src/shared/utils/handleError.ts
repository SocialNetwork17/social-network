import { EmptyErrorResponse, ErrorWithMessageResponse, ServerError } from '@/shared/types/types'

export function handleError(responseError: unknown): ServerError {
  const err = responseError as any

  // Валидационные ошибки
  if (Array.isArray(err?.messages) && err.messages.length > 0) {
    throw {
      type: 'validation',
      statusCode: err.statusCode,
      field: err.messages[0].field,
      message: err.messages[0].message,
    } as ErrorWithMessageResponse
  }

  // Остальные ошибки (пустые 401/403/429 или 500+)
  throw {
    type: 'general',
    statusCode: err.statusCode || err.status || 500,
    message: err.message || err.error || 'Unknown server error',
  } as EmptyErrorResponse
}
