
import React from 'react'
import { IconButton } from "@/shared/ui/IconButton/IconButton"
import s from '../CropStep.module.scss'

type Props = {
    activeIndex: number
    imagesLength: number
    onPrev: () => void
    onNext: () => void
}

export const NavigationArrows = ({
                                     activeIndex,
                                     imagesLength,
                                     onPrev,
                                     onNext
                                 }: Props) => {

    if (imagesLength <= 1) {
        return null
    }

    return (
        <div className={s.navigationArrows}>
            <div className={s.arrowButton}>
                <IconButton
                    iconId={'arrow-ios-back'}
                    disabled={activeIndex === 0}
                    onClick={onPrev}
                    size={40}
                />
            </div>

            <div className={s.arrowButton}>
                <IconButton
                    iconId={'arrow-ios-forward'}
                    disabled={activeIndex === imagesLength - 1}
                    onClick={onNext}
                    size={40}
                />
            </div>
        </div>
    )
}