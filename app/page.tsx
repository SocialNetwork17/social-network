import MainPage from "@/pages/main/ul/MainPage";
import {getAllPostsServer} from "@/pages/main/api/getAllPostsServer";
import {getUserTotalCountServer} from "@/pages/main/api/getUserTotalCountServer";

export default async function Home() {

    const posts = await getAllPostsServer()

    const totalCount = await getUserTotalCountServer()


  return (
    <>
      <MainPage posts={posts} totalCount={totalCount} />
    </>
  )
}
