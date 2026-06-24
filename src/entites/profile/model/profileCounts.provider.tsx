'use client'

import { useEffect, useCallback, useMemo, useState, type ReactNode } from 'react'
import { useMeQuery } from '@/shared/api/useMeQuery'
import { useProfileByIdQuery } from '../api/useProfileByIdQuery'
import { ProfileCountsContext } from './profileCounts.context'

type Props = {
  children: ReactNode
}

export const ProfileCountsProvider = ({ children }: Props) => {
  const [followersCount, setFollowersCount] = useState(0)
  const [followingCount, setFollowingCount] = useState(0)
  const { data: me, isLoading: isMeLoading } = useMeQuery()
  const { data: profile } = useProfileByIdQuery(me?.userId)

  const initializeCounts = useCallback((counts: { followersCount: number; followingCount: number }) => {
    setFollowersCount(counts.followersCount)
    setFollowingCount(counts.followingCount)
  }, [])

  useEffect(() => {
    if (profile?.userMetadata) {
      initializeCounts({
        followersCount: profile.userMetadata.followers ?? 0,
        followingCount: profile.userMetadata.following ?? 0,
      })
    }
  }, [initializeCounts, profile])

  useEffect(() => {
    if (!isMeLoading && !me) {
      initializeCounts({
        followersCount: 0,
        followingCount: 0,
      })
    }
  }, [initializeCounts, isMeLoading, me])

  const value = useMemo(
    () => ({
      followersCount,
      followingCount,
      setFollowersCount,
      setFollowingCount,
      initializeCounts,
    }),
    [followersCount, followingCount, initializeCounts],
  )
  return (
    <ProfileCountsContext.Provider value={value}>{children}</ProfileCountsContext.Provider>
  )
}
