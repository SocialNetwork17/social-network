import styles from "./MainPageSkeleton.module.scss"
import {Skeleton} from "@/shared/ui/Skeleton/Skeleton";

export const MainPageSkeleton = () => {
    return (
        <div className={styles.skeletonWrapper}>
            <Skeleton height={72}/>
            <div className={styles.skeletonPostsContainer}>
                {
                    Array(4).fill(0).map(()=> {
                        return (
                            <div className={styles.skeletonPost}>
                                <Skeleton height={240} width={234} borderRadius={5}/>
                                <div className={styles.skeletonPostAvatar}>
                                    <Skeleton height={36} width={36} borderRadius={18}/>
                                    <Skeleton height={24} width={82} borderRadius={5}/>
                                </div>
                                <div className={styles.skeletonPostDescription}>
                                    <Skeleton height={23} width={234} borderRadius={5}/>
                                    <Skeleton height={23} width={234} borderRadius={5}/>
                                    <Skeleton height={23} width={234} borderRadius={5}/>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}