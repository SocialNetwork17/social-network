'use client'
import styles from './PostsWithText.module.scss'
import CardWithText from '@/shared/ui/CardWithText/CardWithText'
import Skeleton from '../../Skeleton/Skeleton'
import {useModal} from "@/widgets/modal/model/modal.context";
import {openViewPostModalAC} from "@/widgets/modal/model/modal.types";
import {AllPosts} from "@/pages/main/api/getAllPostsServer";

type Props = {
    posts: AllPosts
}

export default function PostsWithText({posts}: Props) {
    const {pushModal} = useModal()


    const handleImageClick = (postId: number) => {
        pushModal(openViewPostModalAC({postId: postId}))
    }
    /*todo*/
    return (
        <>
            <div className={styles.container}>
                {!posts.items &&
                    Array(4)
                        .fill(null)
                        .map((_, index) => (
                            <div className={styles.wpapper} key={index}>
                                <Skeleton height={240} width={234}/>
                                <div className={styles.block}>
                                    <Skeleton height={36} width={36} bordeRadius={18}/>
                                    <Skeleton height={16} width={82}/>
                                </div>
                                <Skeleton height={16} width={63}/>
                                <Skeleton height={63} width={234}/>
                            </div>
                        ))}
                {posts.items?.map(el => (
                <CardWithText post={el} key={el.id} onClick={() => handleImageClick(el.id)}/>
            ))}
            </div>
        </>
    )
}
