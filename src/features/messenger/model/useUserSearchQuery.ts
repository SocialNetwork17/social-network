import { useQuery } from '@tanstack/react-query'
import { messengerApi } from '../api/messengerApi'

export const useUserSearchQuery = (searchTerm: string, enabled: boolean) => {
  return useQuery({
    queryKey: ['messenger', 'user-search', searchTerm],
    queryFn: () => messengerApi.searchUsers(searchTerm),
    enabled,
    staleTime: 30_000,
    retry: 1,
  })
}
