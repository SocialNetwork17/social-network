'use client'

import s from './ImageModalHeader.module.scss'
import { usePostQuery } from "@/shared/api/usePostQuery"
import {useDataMyProfileQuery} from "@/pages/profile/api/useDataMyProfileQuery";
import {ThreeDotsMenu} from "@/features/post/viewPost/ui/ImageModalHeader/ThreeDotsMenu/ThreeDotsMenu";
import {UserName} from '@/shared/ui/UserName/UserName';

type ImageModalHeaderProps = {
    postId: number
    isEditMode?: boolean
}

export const ImageModalHeader = ({postId, isEditMode}: ImageModalHeaderProps) => {

    const {data: dataProfile} = useDataMyProfileQuery()
    const {data: postInfo} = usePostQuery(postId)

    const isOwner = postInfo?.ownerId === dataProfile?.id

    if (!postInfo) {
        return null
    }

    return (
        <div className={s.header}>
            <UserName post={postInfo} />

            {isOwner && !isEditMode &&  <ThreeDotsMenu postId={postId} />}
        </div>
    )
}