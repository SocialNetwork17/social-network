import { client } from '@/shared/api/client'
import { useAuth } from '@/shared/hooks/useAuth'
import UserProfile from '@/shared/ui/UserProfile/UserProfile'
import { useQuery } from '@tanstack/react-query'

export default function MyProfile() {
  const { isAuth } = useAuth()

  const query = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await client.GET('/api/v1/users/profile')
      return response.data
    },
  })

  if (query.isLoading) {
    return (
        <div>Загрузка профиля...</div>
    )
  }

  if (query.error) {
    return (
        <div>Ошибка</div>
    )
  }

  return (
    <div>
      <UserProfile
        user={query.data}
        type={isAuth ? 'profile' : 'unauthorized'}
      />
    </div>
  )
}
