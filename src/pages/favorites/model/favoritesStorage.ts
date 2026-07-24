'use client'

const FAVORITE_POST_IDS_STORAGE_KEY = 'favoritePostIds'
const listeners = new Set<() => void>()

const canUseStorage = () => typeof window !== 'undefined'

const parseFavoritePostIds = (value: string | null) => {
  if (!value) return []

  try {
    const parsed = JSON.parse(value)

    if (!Array.isArray(parsed)) return []

    return parsed.filter((id): id is number => Number.isInteger(id))
  } catch {
    return []
  }
}

const notifyListeners = () => {
  listeners.forEach(listener => listener())
}

export const favoritesStorage = {
  getPostIds() {
    if (!canUseStorage()) return []

    return parseFavoritePostIds(localStorage.getItem(FAVORITE_POST_IDS_STORAGE_KEY))
  },

  hasPost(postId: number) {
    return this.getPostIds().includes(postId)
  },

  togglePost(postId: number) {
    const postIds = this.getPostIds()
    const isFavorite = postIds.includes(postId)
    const nextPostIds = isFavorite ? postIds.filter(id => id !== postId) : [postId, ...postIds]

    localStorage.setItem(FAVORITE_POST_IDS_STORAGE_KEY, JSON.stringify(nextPostIds))
    notifyListeners()

    return !isFavorite
  },

  subscribe(listener: () => void) {
    if (!canUseStorage()) return () => {}

    const handleStorage = (event: StorageEvent) => {
      if (event.key === FAVORITE_POST_IDS_STORAGE_KEY) {
        listener()
      }
    }

    listeners.add(listener)
    window.addEventListener('storage', handleStorage)

    return () => {
      listeners.delete(listener)
      window.removeEventListener('storage', handleStorage)
    }
  },
}
