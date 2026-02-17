import {MainPage} from "@/pages/main/ul/MainPage";
import {getAllPostsServer} from "@/pages/main/api/getAllPostsServer";
import {getUserTotalCountServer} from "@/pages/main/api/getUserTotalCountServer";

export default async function Home() {

    const [posts, totalCount] = await Promise.all([
        getAllPostsServer(),
        getUserTotalCountServer()
    ])



  return (
    <>
      <MainPage posts={posts} totalCount={totalCount} />
    </>
  )
}
