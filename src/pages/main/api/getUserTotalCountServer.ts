import { client } from '@/shared/api/client'

export async function getUserTotalCountServer() {
  const response = await client.GET('/api/v1/public-user')

  if (!response.data) {
    throw new Error('No data received from server')
  }
  return response.data
}
