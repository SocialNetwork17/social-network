export function getExactDate(dateString: string, withTime: boolean = false) {
  const date = new Date(dateString)
  const dateStr = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
  
  if (withTime) {
    const timeStr = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
    return `${dateStr} ${timeStr}`
  }
  
  return dateStr
}