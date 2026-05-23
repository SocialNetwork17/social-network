import {getProfileServer} from '@/pages/profile/api/getProfileServer'
import {Profile} from '@/pages/profile/ui/Profile'
import {getPostsServer} from "@/pages/profile/api/getPostsServer";
import {getModalPostByIdServer} from "@/features/post/viewPost/api/getModalPostByIdServer";

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
    console.log(profileInfo)
    return <Profile userPosts={userPosts} profileInfo={profileInfo} imageModalPost={imageModalPost}/>
}
