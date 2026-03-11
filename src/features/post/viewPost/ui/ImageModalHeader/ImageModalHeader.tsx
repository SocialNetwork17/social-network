'use client'
import s from './ImageModalHeader.module.scss'
import {useDataMyProfileQuery} from "@/pages/profile/api/useDataMyProfileQuery";
import {ThreeDotsMenu} from "@/features/post/viewPost/ui/ImageModalHeader/ThreeDotsMenu/ThreeDotsMenu";
import {UserName} from '@/shared/ui/UserName/UserName';
import {ViewModeType} from "@/features/post/viewPost/ui/model/imageModalServer.types";
import {SchemaPostViewModel} from "@/shared/api/schema";

type ImageModalHeaderProps = {
    imageModalPost: SchemaPostViewModel
    isEditMode?: boolean
    setViewMode: (viewMode: ViewModeType) => void
}

export const ImageModalHeader = ({imageModalPost, isEditMode, setViewMode}: ImageModalHeaderProps) => {

    const {data: dataProfile} = useDataMyProfileQuery()

    const isOwner = imageModalPost?.ownerId === dataProfile?.id

    if (!imageModalPost) {
        //добавить
        return <span>loading</span>
    }

    return (
        <div className={s.header}>
            <UserName post={imageModalPost} />
            {isOwner && !isEditMode &&  <ThreeDotsMenu postId={imageModalPost.id} setViewMode={setViewMode}/>}
        </div>
    )
}