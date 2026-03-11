import {MainPage} from "@/pages/main/ul/MainPage";
import {getAllPostsServer} from "@/pages/main/api/getAllPostsServer";
import {getUserTotalCountServer} from "@/pages/main/api/getUserTotalCountServer";
import {getModalPostByIdServer} from "@/features/post/viewPost/api/getModalPostByIdServer";
import {MainPageSkeleton} from "@/pages/main/ul/MainPageSkeleton/MainPageSkeleton";

export const revalidate = 300

type Props = {
    searchParams: Promise<{ postId: string }>
}

export default async function Home({searchParams}: Props) {

    const {postId} = await searchParams


    const [posts, totalCount, imageModalPost] = await Promise.all([
        getAllPostsServer(),
        getUserTotalCountServer(),
        postId ? getModalPostByIdServer(Number(postId)) : Promise.resolve(undefined)
    ])

    if (!posts || !totalCount) return <MainPageSkeleton/>

    return <MainPage posts={posts} totalCount={totalCount} imageModalPost={imageModalPost}/>
}
