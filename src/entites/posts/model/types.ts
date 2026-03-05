import {
    SchemaInfinityPaginatedPosts,
    SchemaPostViewModel,
} from '@/shared/api/schema'

export type AllPosts = SchemaInfinityPaginatedPosts & {
    items: SchemaPostViewModel[]
}