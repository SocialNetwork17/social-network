import { useQuery } from '@tanstack/react-query'
import { client } from '@/shared/api/client'

export type ProfileResponse = {
    id: number
    userName: string
    firstName: string
    lastName: string
    city: string
    country: string
    region: string
    dateOfBirth: string
    aboutMe: string
    avatars: {
        url: string
        width: number
        height: number
        fileSize: number
        createdAt: string
    }[]
    createdAt: string
}

export const useProfileQuery = () => {
    return useQuery({
        queryKey: ['profile'],

        queryFn: async () => {
            const response = await client.GET('/api/v1/users/profile')

            if (!response.data) {
                throw new Error('Profile not found')
            }

            return response.data as ProfileResponse
        },

        refetchOnWindowFocus: false,
    })
}
