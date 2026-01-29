import {client} from '@/shared/api/client'
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
    const response = await client.GET('/api/v1/posts/all/{endCursorPostId}',
        {
            params: {
                path: {endCursorPostId},
                query: {pageSize, sortDirection},
            },
        }
    )

    if (!response.data) {
        throw new Error('No data received from server')
    }

    return response.data as AllPosts
}