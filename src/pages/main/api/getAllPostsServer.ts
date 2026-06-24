import {
    SchemaInfinityPaginatedPosts,
    SchemaPostViewModel,
} from '@/shared/api/schema'

export type AllPosts = SchemaInfinityPaginatedPosts & {
    items: SchemaPostViewModel[]
}

export async function getAllPostsServer(
    pageSize = 4,
    sortDirection: 'asc' | 'desc' = 'desc',
    endCursorPostId = 0
): Promise<AllPosts> {

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/posts/all/${endCursorPostId}?pageSize=${pageSize}&sortDirection=${sortDirection}`

    const response = await fetch(url)

    if (!response.ok) {
        throw new Error('Failed to fetch posts')
    }

    return response.json()
}