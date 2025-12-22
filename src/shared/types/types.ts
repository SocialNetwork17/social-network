export type ResponseType = 'validation' | 'general'

export type FieldType = 'password' | 'email' | 'dateOfBirth' | 'userName'

export type ErrorWithMessageResponse = {
  type: ResponseType
  field: FieldType
  statusCode: number
  message: string
}

export type EmptyErrorResponse = {
  type: ResponseType
  statusCode: number
  message: string
}

export type ServerError = ErrorWithMessageResponse | EmptyErrorResponse
