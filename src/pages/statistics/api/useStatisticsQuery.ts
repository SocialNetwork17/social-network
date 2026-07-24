import { useQuery } from '@tanstack/react-query'

import { client } from '@/shared/api/client'
import { SchemaPostViewModel } from '@/shared/api/schema'
import {
    StatisticsChartPoint,
    StatisticsPeriod,
} from '@/pages/statistics/ui/StatisticsChartBlock/StatisticsChartBlock'

export type StatisticsChartsData = {
    likes: Record<StatisticsPeriod, StatisticsChartPoint[]>
    comments: Record<StatisticsPeriod, StatisticsChartPoint[]>
    publicationViews: Record<StatisticsPeriod, StatisticsChartPoint[]>
}

type CommentsResponse = {
    totalCount?: number
}

type PostWithCommentsCount = SchemaPostViewModel & {
    commentsCount: number
}

const periodsConfig: Record<StatisticsPeriod, number> = {
    week: 7,
    month: 31,
}

const formatLabel = (date: Date) => {
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
    })
}

const getDayKey = (date: Date) => {
    return date.toISOString().slice(0, 10)
}

const buildPeriodPoints = <Post extends SchemaPostViewModel>(
    sourcePosts: Post[],
    getValue: (post: Post) => number,
    period: StatisticsPeriod
) => {
    const daysCount = periodsConfig[period]
    const newestPostTime = Math.max(...sourcePosts.map(post => new Date(post.createdAt).getTime()).filter(Boolean))
    const endDate = Number.isFinite(newestPostTime) ? new Date(newestPostTime) : new Date()
    const buckets = new Map<string, StatisticsChartPoint>()

    Array.from({ length: daysCount }).forEach((_, index) => {
        const date = new Date(endDate)
        date.setDate(endDate.getDate() - (daysCount - 1 - index))

        buckets.set(getDayKey(date), {
            label: formatLabel(date),
            value: 0,
        })
    })

    sourcePosts.forEach(post => {
        const date = new Date(post.createdAt)
        const bucket = buckets.get(getDayKey(date))

        if (bucket) {
            bucket.value += getValue(post)
        }
    })

    return Array.from(buckets.values())
}

const buildChartData = <Post extends SchemaPostViewModel>(posts: Post[], getValue: (post: Post) => number) => {
    return {
        week: buildPeriodPoints(posts, getValue, 'week'),
        month: buildPeriodPoints(posts, getValue, 'month'),
    }
}

const getCommentsCountByPostId = async (postId: number) => {
    const response = await client.GET('/api/v1/public-posts/{postId}/comments', {
        params: {
            path: { postId },
            query: {
                pageNumber: 1,
                pageSize: 1,
                sortDirection: 'desc',
            },
        },
    })

    if (response.error) return 0

    return (response.data as CommentsResponse | undefined)?.totalCount ?? 0
}

const getStatisticsData = async (): Promise<StatisticsChartsData> => {
    const postsResponse = await client.GET('/api/v1/public-posts/all/{endCursorPostId}', {
        params: {
            path: { endCursorPostId: 0 },
            query: {
                pageSize: 30,
                sortDirection: 'desc',
            },
        },
    })

    if (postsResponse.error || !postsResponse.data) {
        throw new Error('Failed to fetch statistics posts')
    }

    const posts = postsResponse.data.items ?? []
    const commentsCounts = await Promise.all(posts.map(post => getCommentsCountByPostId(post.id)))
    const postsWithComments: PostWithCommentsCount[] = posts.map((post, index) => ({
        ...post,
        commentsCount: commentsCounts[index] ?? 0,
    }))

    return {
        likes: buildChartData(postsWithComments, post => post.likesCount),
        comments: buildChartData(postsWithComments, post => post.commentsCount),
        publicationViews: buildChartData(postsWithComments, () => 0),
    }
}

export const useStatisticsQuery = () => {
    return useQuery({
        queryKey: ['statistics'],
        queryFn: getStatisticsData,
        staleTime: 2 * 60 * 1000,
        refetchOnWindowFocus: false,
    })
}
