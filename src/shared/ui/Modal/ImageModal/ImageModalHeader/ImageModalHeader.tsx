'use client'

import s from './ImageModalHeader.module.scss'
import { usePostQuery } from "@/shared/api/usePostQuery"
import {useDataMyProfileQuery} from "@/pages/profile/api/useDataMyProfileQuery";
import {ThreeDotsMenu} from "@/shared/ui/Modal/ImageModal/ImageModalHeader/ThreeDotsMenu/ThreeDotsMenu";
import UserName from '@/shared/ui/UserName/UserName';

type ImageModalHeaderProps = {
    postId: number
}

export const ImageModalHeader = ({postId}: ImageModalHeaderProps) => {

    const {data: dataProfile} = useDataMyProfileQuery()
    const {data: postInfo} = usePostQuery(postId)

    const isOwner = postInfo?.ownerId === dataProfile?.id

    if (!postInfo) {
        return null
    }

    return (
        <div className={s.header}>
            <UserName post={postInfo} />

            {isOwner && <ThreeDotsMenu postId={postId} />}
        </div>
    )
}