export async function getUserTotalCountServer() {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public-user`

    const response = await fetch(url)

    if (!response.ok) {
        throw new Error('Failed to fetch user count')
    }

    return response.json()
}
