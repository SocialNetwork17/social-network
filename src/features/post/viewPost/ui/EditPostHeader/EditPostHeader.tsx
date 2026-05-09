import React from 'react';
import s from './EditPostHeader.module.scss'
import {IconButton} from "@/shared/ui/IconButton/IconButton";
import {openCancelEditPostModalAC} from "@/widgets/modal/model/modal.types";
import {useModal} from "@/widgets/modal/model/modal.context";
import {ViewModeType} from "@/features/post/viewPost/ui/model/imageModalServer.types";

type Props = {
    setViewMode: (viewMode: ViewModeType) => void
}

export const EditPostHeader = ({setViewMode}: Props) => {

    const {pushModal} = useModal()

    const onCancelEdit = () => {
        setViewMode('VIEW_POST')
    }

    const onCloseEditPostModal = () => {
        pushModal(openCancelEditPostModalAC({
            title: "Close Post",
            description: "Do you really want to close the edition of the publication?\nIf you close changes won’t be saved",
            onConfirm: onCancelEdit
        }))
    }

    return (
        <div className={s.editPostHeader}>
            <p className={s.editTextHeader}>Edit Post</p>
            <IconButton iconId={"logoutBtnCloseSvg"} onClick={onCloseEditPostModal}/>
        </div>
    );
};
