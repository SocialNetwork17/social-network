import {SchemaPostViewModel} from "@/shared/api/schema";

export async function getModalPostByIdServer (postId: number): Promise<SchemaPostViewModel> {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/posts/id/${postId}`

    const response = await fetch(url)

    if (!response.ok) {
        throw new Error('Failed to fetch posts')
    }
    return response.json()
}