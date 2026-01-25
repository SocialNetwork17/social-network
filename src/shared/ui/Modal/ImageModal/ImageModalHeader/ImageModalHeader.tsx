'use client'

import s from './ImageModalHeader.module.scss'
import { usePostQuery } from "@/shared/api/usePostQuery"
import {useModal} from "@/widgets/modal/model/modal.context";
import {deletePostModalAC} from "@/widgets/modal/model/modal.types";
import { openEditPostModalAC } from "@/widgets/modal/model/modal.types"
import {useDataMyProfileQuery} from "@/pages/profile/api/useDataMyProfileQuery";
import {ThreeDotsMenu} from "@/shared/ui/Modal/ImageModal/ImageModalHeader/ThreeDotsMenu/ThreeDotsMenu";

type ImageModalHeaderProps = {
    postId: number
}

export default function ImageModalHeader({postId}: ImageModalHeaderProps) {

    const {pushModal, popModal} = useModal()

    const {data: dataProfile} = useDataMyProfileQuery()
    const {data: postInfo} = usePostQuery(postId)

    const isOwner = postInfo?.ownerId === dataProfile?.id

    const handleEdit = () => {
        if (!postInfo) return
        popModal() // закрываем VIEW_POST
        pushModal(openEditPostModalAC({postId}))
    }

    const handleDeleteClick = () => {
        pushModal(deletePostModalAC({
            title: 'Delete Post',
            description: 'Are you sure you want to delete this post?',
            postId: postId
        }))
    }

    if (!postInfo) {
        return null
    }

    return (
        <div className={s.header}>
            <div className={s.userInfo}>
                {/* Аватарка пользователя */}
                {/*todo*/}
                {postInfo.avatarOwner ? (
                    <img
                        src={postInfo.avatarOwner}
                        alt={`${postInfo.userName}'s avatar`}
                        className={s.avatar}
                        onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                        }}
                    />
                ) : (
                    <div className={s.avatarPlaceholder}>
                        {(postInfo.userName?.charAt(0)).toUpperCase()}
                    </div>
                )}
                <span className={s.userName}>{postInfo.userName}</span>
            </div>

            {isOwner && <ThreeDotsMenu onEdit={handleEdit} onDelete={handleDeleteClick} />}
        </div>
    )
}