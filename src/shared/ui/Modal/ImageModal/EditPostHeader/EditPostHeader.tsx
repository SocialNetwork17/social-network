import React from 'react';
import s from './EditPostHeader.module.scss'
import {IconButton} from "@/shared/ui/IconButton/IconButton";

type Props = {
    onCloseEditPostModal: () => void,
}

export const EditPostHeader = ({onCloseEditPostModal}: Props) => {

    return (
        <div className={s.editPostHeader}>
            <p className={s.editTextHeader}>Edit Post</p>
            <IconButton iconId={"logoutBtnCloseSvg"} onClick={onCloseEditPostModal}/>
        </div>
    );
};
