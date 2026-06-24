'use client'

import { createContext, useContext, type Dispatch, type SetStateAction } from 'react'

type ProfileCountsContextValue = {
  followersCount: number
  followingCount: number
  setFollowersCount: Dispatch<SetStateAction<number>>
  setFollowingCount: Dispatch<SetStateAction<number>>
  initializeCounts: (counts: { followersCount: number; followingCount: number }) => void
}

export const ProfileCountsContext = createContext<ProfileCountsContextValue | null>(null)

export const useProfileCounts = () => {
  const ctx = useContext(ProfileCountsContext)

  if (!ctx) {
    throw new Error('useProfileCounts must be used within ProfileCountsProvider')
  }

  return ctx
}
