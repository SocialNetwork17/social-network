import {
    SchemaPublicProfileViewModel,
} from '@/shared/api/schema'


export async function getProfileServer(profileId: number): Promise<SchemaPublicProfileViewModel> {

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public-user/profile/${profileId}`

    const response = await fetch(url)

    if (!response.ok) {
        throw new Error('Failed to fetch posts')
    }

    return response.json()
}