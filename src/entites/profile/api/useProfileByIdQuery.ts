'use client'

import { useQuery } from '@tanstack/react-query'
import { client } from '@/shared/api/client'

export const useProfileByIdQuery = (profileId?: number) => {
  return useQuery({
    queryKey: ['profile-counts', profileId],
    enabled: Boolean(profileId),
    queryFn: async () => {
      if (!profileId) {
        return null
      }

      const response = await client.GET('/api/v1/public-user/profile/{profileId}', {
        params: {
          path: {
            profileId,
          },
        },
      })

      if (response.error || !response.data) {
        return null
      }

      return response.data
    },
    staleTime: 5 * 60 * 1000,
  })
}
