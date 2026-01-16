import { useQuery} from '@tanstack/react-query'
import { client } from '@/shared/api/client'

export const useDataProfileQuery = () => {
  return useQuery({
    queryKey: ['my profile data'],
    queryFn: async () => {
      const response = await client.GET('/api/v1/users/profile')
      return response.data
    },
  })
}
