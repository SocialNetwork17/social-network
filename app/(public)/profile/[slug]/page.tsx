import {getProfileServer} from '@/pages/profile/api/getProfileServer'
import {Profile} from '@/pages/profile/ui/Profile'
import {getPostsServer} from "@/pages/profile/api/getPostsServer";
import {getModalPostByIdServer} from "@/features/post/viewPost/api/getModalPostByIdServer";
import {ProfileSkeleton} from "@/pages/profile/ui/ProfileSkeleton/ProfileSkeleton";

type PageProps = {
    params: Promise<{
        slug: string
    }>
    searchParams: Promise<{
        postId: string
    }>
}

export default async function UserProfile({params, searchParams}: PageProps) {
    const {slug} = await params
    const {postId} = await searchParams
    const userId = Number(slug)

    const [profileInfo, userPosts, imageModalPost] = await Promise.all([
        getProfileServer(userId),
        getPostsServer(userId),
        postId ? getModalPostByIdServer(Number(postId)) : Promise.resolve(undefined)
    ])

    if(!profileInfo || !userPosts) return <ProfileSkeleton/>

    return <Profile userPosts={userPosts} profileInfo={profileInfo} imageModalPost={imageModalPost}/>
}
