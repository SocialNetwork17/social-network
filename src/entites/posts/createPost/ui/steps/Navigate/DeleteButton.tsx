import React from 'react'
import { Icon } from "@/shared/ui/Icon/Icon"
import s from '@/entites/posts/createPost/ui/steps/Step2Crop/CropStep.module.scss'

type Props = {
    onClick: () => void
}

export const DeleteButton = ({ onClick }: Props) => {
    return (
        <button
            className={s.deleteButton}
            onClick={onClick}
        >
            <Icon iconId={'logoutBtnCloseSvg'} />
        </button>
    )
}