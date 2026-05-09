'use client'

import styles from './Comment.module.scss'
import {SchemaPostViewModel} from '@/shared/api/schema'
import {Card} from '../Card/Card'
import {getTimeAgo} from '@/shared/utils/getTimeAgo'
import Link from 'next/link'
import {PATH} from '@/shared/constants/routings'
import {useModal} from '@/widgets/modal/model/modal.context'

type Props = {
    postinfo: SchemaPostViewModel
}

export const Comment = ({postinfo}: Props) => {


    if(!postinfo) {
        return <span>loading</span>
    }

    const {popModal} = useModal()

    const handleUserNameClick = () => {
        popModal()
    }

    const dateTime = getTimeAgo(postinfo.createdAt)

    return (
        <div className={styles.container}>
            <Link
                href={PATH.PROFILE + `/${postinfo.ownerId}`}
                className={styles.image}
                onClick={() => handleUserNameClick()}
            >
                {postinfo.avatarOwner ? (
                    <Card images={postinfo.avatarOwner} width={36} height={36} variant="circular"/>
                ) : (
                    <div className={styles.avatarPlaceholder}>
                        {(postinfo.userName?.charAt(0) || 'U').toUpperCase()}
                    </div>
                )}
            </Link>
            <div>
                <div>
                    <Link href={PATH.PROFILE + `/${postinfo.ownerId}`} onClick={() => handleUserNameClick()}>
                        <span className={styles.link}>{postinfo.userName}</span>
                    </Link>
                    <span className={styles.comment}>{postinfo.description}</span>
                </div>
                <div className={styles.time}>{dateTime}</div>
            </div>
        </div>
    )
}
