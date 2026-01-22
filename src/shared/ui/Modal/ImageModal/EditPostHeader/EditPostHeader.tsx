import React from 'react';
import s from './EditPostHeader.module.scss'

type Props = {
    onCancel: () => void,
}

export const EditPostHeader = ({onCancel}: Props) => {
    return (
        <div className={s.editPostHeader}>
            <p className={s.editTextHeader}>Edit Post</p>
            <button onClick={onCancel} className={s.closeEditButton}>✕</button>
        </div>
    );
};
