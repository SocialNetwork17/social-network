'use client'

import { useMeQuery } from '@/features/auth/api/useMeQuery'
import { Sidebar } from './Sidebar'

export const AuthSidebar = () => {
  const { data, isError } = useMeQuery()

  if (isError || !data) {
    return null
  }

  return <Sidebar />
}
