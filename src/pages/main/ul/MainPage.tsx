import styles from './MainPage.module.scss'
import {UserAmount} from './UserAmount/UserAmount'
import {AllPosts} from "@/pages/main/api/getAllPostsServer";
import {PostsWithText} from "@/shared/ui/Posts/PostsWithText/PostsWithText";
import {SchemaPostViewModel} from "@/shared/api/schema";
import {ImageModalServer} from "@/features/post/viewPost/ui/ImageModalServer";
import {Suspense} from "react";
import {Loader} from "@/shared/ui/Loader/Loader";

type Props = {
    posts: AllPosts
    totalCount: { totalCount: number }
    imageModalPost?: SchemaPostViewModel
}

export const MainPage = ({posts, totalCount, imageModalPost}: Props) => {

    return (
        <div className={styles.container}>
            <UserAmount totalCount={totalCount.totalCount}/>
            <PostsWithText posts={posts}/>
            {
                imageModalPost && <Suspense fallback={<Loader/>}>
                    <ImageModalServer imageModalPost={imageModalPost}/>
                </Suspense>
            }
        </div>
    )
}
