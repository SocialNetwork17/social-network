'use client'
import {useAuth} from '@/shared/hooks/useAuth'
import styles from './Profile.module.scss'
import {ProfileHeader} from '@/shared/ui/ProfileHeader/ProfileHeader'
import {PostSimple} from '@/shared/ui/Posts/PostSimple/PostSimple'
import {SchemaPostViewModel, SchemaProfileViewModel, SchemaPublicProfileViewModel} from '@/shared/api/schema'
import {AllPosts} from "@/pages/main/api/getAllPostsServer";
import {Suspense} from "react";
import {Loader} from "@/shared/ui/Loader/Loader";
import {ImageModalServer} from "@/features/post/viewPost/ui/ImageModalServer";

type Props = {
    profileInfo: SchemaProfileViewModel | SchemaPublicProfileViewModel
    userPosts: AllPosts
    imageModalPost?: SchemaPostViewModel
}

export const Profile = ({profileInfo, userPosts, imageModalPost}: Props) => {

    const {isAuth} = useAuth()

    return (
        <div className={styles.container}>
            <ProfileHeader
                user={profileInfo}
                publicationCount={userPosts.totalCount}
                type={isAuth ? 'profile' : 'unauthorized'}
            />
            <PostSimple posts={userPosts}/>
            {
                imageModalPost && <Suspense fallback={<Loader/>}>
                    <ImageModalServer imageModalPost={imageModalPost}/>
                </Suspense>
            }
        </div>
    )
}
