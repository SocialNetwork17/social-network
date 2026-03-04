'use client'
import {useAuth} from '@/shared/hooks/useAuth'
import styles from './Profile.module.scss'
import {ProfileHeader} from '@/shared/ui/ProfileHeader/ProfileHeader'
import {PostSimple} from '@/shared/ui/Posts/PostSimple/PostSimple'
import {SchemaProfileViewModel, SchemaPublicProfileViewModel} from '@/shared/api/schema'
import {AllPosts} from "@/pages/main/api/getAllPostsServer";

type Props = {
    profileInfo: SchemaProfileViewModel | SchemaPublicProfileViewModel
    userPosts: AllPosts
}

export const Profile = ({profileInfo, userPosts}: Props) => {

    const {isAuth} = useAuth()

    return (
        <div className={styles.container}>
            <ProfileHeader user={profileInfo} publicationCount={userPosts.totalCount} type={isAuth ? 'profile' : 'unauthorized'}/>
            <PostSimple posts={userPosts}/>
        </div>
    )
}
