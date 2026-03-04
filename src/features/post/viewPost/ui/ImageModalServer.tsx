// import {ImageModalClient} from "@/features/post/viewPost/ui/ImageModalClient";
// import {getModalPostByIdServer} from "@/features/post/viewPost/api/getModalPostByIdServer";
// import {Loader} from "@/shared/ui/Loader/Loader";
//
// type Props = {
//     postId: number
// }
//
// export default async function ImageModalServer({postId}: Props) {
//
//     const [post] = await Promise.all([
//         getModalPostByIdServer(postId)
//     ])
//
//      if (!post) return <Loader/>
//
//     return <ImageModalClient post={post} modal={modal}/>
// }