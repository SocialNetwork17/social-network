'use client'

import Profile from '@/pages/profile/ui/Profile'
import { useParams } from 'next/navigation'

export default function userProfile() {
  const params = useParams()
  const userId = Number(params?.slug)

  return <Profile ownerId={userId} />
}
