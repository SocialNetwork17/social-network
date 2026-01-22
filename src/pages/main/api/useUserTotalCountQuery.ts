import { useQuery} from '@tanstack/react-query'
import { client } from '@/shared/api/client'

export const useUserTotalCountQuery = () => {
  return useQuery({
    queryKey: ['total count registered users'],
    queryFn: async () => {
      const response = await client.GET('/api/v1/public-user')
      return response.data
    },
  })
}
