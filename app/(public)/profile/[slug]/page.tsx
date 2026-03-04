import {getProfileServer} from '@/pages/profile/api/getProfileServer'
import {Profile} from '@/pages/profile/ui/Profile'
import {getPostsServer} from "@/pages/profile/api/getPostsServer";

type PageProps = {
    params: Promise<{
        slug: string
    }>
}

export default async function UserProfile({params}: PageProps) {
    const {slug} = await params
    const userId = Number(slug)

    const [profileInfo, userPosts] = await Promise.all([
        getProfileServer(userId),
        getPostsServer(userId)
    ])

    return <Profile userPosts={userPosts} profileInfo={profileInfo}/>
}
