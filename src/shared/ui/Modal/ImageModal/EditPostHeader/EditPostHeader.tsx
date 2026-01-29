import React from 'react';
import s from './EditPostHeader.module.scss'
import {IconButton} from "@/shared/ui/IconButton/IconButton";
import {openCancelEditPostModalAC, openViewPostModalAC} from "@/widgets/modal/model/modal.types";
import {useUpdatePostMutation} from "@/shared/api/useUpdatePostMutation";
import {usePostQuery} from "@/shared/api/usePostQuery";
import {useModal} from "@/widgets/modal/model/modal.context";

type Props = {
    postId: number,
    text: string,
}

export const EditPostHeader = ({postId, text}: Props) => {

    const {data: postInfo} = usePostQuery(postId);

    const {pushModal, clearModals} = useModal()

    const onCloseEditPostModal = () => {
        if (text === postInfo?.description) {
            clearModals()
            pushModal(openViewPostModalAC({postId: postInfo!.id}))
            return
        }
        pushModal(openCancelEditPostModalAC({
            title: "Edit Post",
            description: "Are you sure you want to undo the post edit?",
        }))
    }


    return (
        <div className={s.editPostHeader}>
            <p className={s.editTextHeader}>Edit Post</p>
            <IconButton iconId={"logoutBtnCloseSvg"} onClick={onCloseEditPostModal}/>
        </div>
    );
};
