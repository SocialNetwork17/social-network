'use client'

import { useCallback, useEffect, useState } from 'react'
import { favoritesStorage } from './favoritesStorage'

export const useFavoritePostState = (postId: number) => {
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const syncFavoriteState = () => {
      setIsFavorite(favoritesStorage.hasPost(postId))
    }

    syncFavoriteState()

    return favoritesStorage.subscribe(syncFavoriteState)
  }, [postId])

  const handleFavoriteClick = useCallback(() => {
    setIsFavorite(favoritesStorage.togglePost(postId))
  }, [postId])

  return {
    handleFavoriteClick,
    isFavorite,
  }
}
