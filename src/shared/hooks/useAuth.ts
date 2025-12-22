import { useMeQuery } from '@/shared/api/useMeQuery'

export const useAuth = () => {
  const { data, isLoading, isError } = useMeQuery()

  const isAuth = Boolean(data)

  return {
    isAuth,
    isLoading,
    isError,
    user: data,
  }
}
