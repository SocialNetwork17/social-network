import { AllPosts } from '@/pages/main/api/getAllPostsServer'

export async function getMyPostServer(
  userId: number,
  pageSize: number = 8,
  sortDirection: 'asc' | 'desc' = 'desc',
  endCursorPostId?: number
): Promise<AllPosts> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/posts/user/{userId}/{endCursorPostId}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Failed to fetch posts')
  }

  return response.json()
}
