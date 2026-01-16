import React from 'react'
import s from '@/entites/posts/createPost/ui/steps/Step2Crop/CropStep.module.scss'

type Props = {
    aspect: number
    onAspectChange: (aspect: number) => void
}

export const AspectRatioPanel = ({ aspect, onAspectChange }: Props) => {
    const isActive = (value: number) => Math.abs(aspect - value) < 0.001

    return (
        <div className={s.toolsPanel}>
            <div className={s.toolsSection}>
                <div className={s.aspectGrid}>
                    <button onClick={() => onAspectChange(1)} className={`${s.aspectButton} ${isActive(1) ? s.active : s.inactive}`} title="1:1 Квадрат">
                        <span>1:1</span>
                    </button>
                    <button onClick={() => onAspectChange(4/5)} className={`${s.aspectButton} ${isActive(4/5) ? s.active : s.inactive}`} title="4:5 Портрет">
                        <span>4:5</span>
                    </button>
                    <button onClick={() => onAspectChange(16/9)} className={`${s.aspectButton} ${isActive(16/9) ? s.active : s.inactive}`} title="16:9 Ландшафт">
                        <span>16:9</span>
                    </button>
                </div>
            </div>
        </div>
    )
}