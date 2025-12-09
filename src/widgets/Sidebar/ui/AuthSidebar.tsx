'use client'

import { useMeQuery } from '@/features/auth/api/useMeQuery'
import { Sidebar } from './Sidebar'

export const AuthSidebar = () => {
  const { data, isError } = useMeQuery()

  // Показываем скелетон во время загрузки
  //   if (isLoading) {
  //     return <SidebarSkeleton />;
  //   }

  // Не показываем сайдбар если пользователь не аутентифицирован
  if (isError || !data) {
    return null
  }

  // Показываем сайдбар только для аутентифицированных пользователей
  return <Sidebar />
}
