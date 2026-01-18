
import React from 'react'
import s from '@/entites/posts/createPost/ui/steps/Step2Crop/CropStep.module.scss'
import { IconButton } from "@/shared/ui/IconButton/IconButton"

type Props = {
    onAspectButtonClick: () => void
    onZoomButtonClick: () => void
}

export const ToolButtons = ({ onAspectButtonClick, onZoomButtonClick }: Props) => {
    return (
        <>
            <div className={s.cropTools} onClick={onAspectButtonClick}>
                <IconButton
                    iconId={'cropTools'}
                    onClick={onAspectButtonClick}
                />
            </div>

            <div className={s.zoomTools} onClick={onZoomButtonClick}>
                <IconButton
                    iconId={'zoomIn'}
                    onClick={onZoomButtonClick}
                />
            </div>

        </>
    )
}