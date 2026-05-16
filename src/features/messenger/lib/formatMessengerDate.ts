export const formatMessengerDate = (value: string) => {
  const date = new Date(value)
  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startOfMessageDay = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const diffInDays = Math.floor(
    (startOfToday.getTime() - startOfMessageDay.getTime()) / (1000 * 60 * 60 * 24)
  )

  if (diffInDays <= 0) {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (diffInDays < 7) {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
    })
  }

  if (date.getFullYear() !== now.getFullYear()) {
    return date
      .toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
      .toLowerCase()
  }

  return date
    .toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
    })
    .toLowerCase()
}
