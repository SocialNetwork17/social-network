'use client'

import styles from './Comment.module.scss'
import {SchemaPostViewModel} from '@/shared/api/schema'
import {Card} from '../Card/Card'
import {getTimeAgo} from '@/shared/utils/getTimeAgo'
import Link from 'next/link'
import {PATH} from '@/shared/constants/routings'
import {useModal} from '@/widgets/modal/model/modal.context'

type Props = {
    imageModalPost: SchemaPostViewModel
}

export const Comment = ({imageModalPost}: Props) => {


    if(!imageModalPost) {
        return <span>loading</span>
    }

    const {popModal} = useModal()

    const handleUserNameClick = () => {
        popModal()
    }

    const dateTime = getTimeAgo(imageModalPost.createdAt)

    return (
        <div className={styles.container}>
            <Link
                href={PATH.PROFILE + `/${imageModalPost.ownerId}`}
                className={styles.image}
                onClick={() => handleUserNameClick()}
            >
                {imageModalPost.avatarOwner ? (
                    <Card images={imageModalPost.avatarOwner} width={36} height={36} variant="circular"/>
                ) : (
                    <div className={styles.avatarPlaceholder}>
                        {(imageModalPost.userName?.charAt(0) || 'U').toUpperCase()}
                    </div>
                )}
            </Link>
            <div>
                <div>
                    <Link href={PATH.PROFILE + `/${imageModalPost.ownerId}`} onClick={() => handleUserNameClick()}>
                        <span className={styles.link}>{imageModalPost.userName}</span>
                    </Link>
                    <span className={styles.comment}>{imageModalPost.description}</span>
                </div>
                <div className={styles.time}>{dateTime}</div>
            </div>
        </div>
    )
}
