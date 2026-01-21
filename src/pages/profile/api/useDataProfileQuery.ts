import { useQuery} from '@tanstack/react-query'
import { client } from '@/shared/api/client'

export const useDataProfileQuery = (profileId: number) => {
  return useQuery({
    queryKey: ['profile data', {profileId}],
    queryFn: async () => {
      const response = await client.GET('/api/v1/public-user/profile/{profileId}', {
        params: {
        path: {
            profileId: profileId
          },
        }
      })
      return response.data
    },
  })
}
