'use client'

import React from 'react'
import s from '@/entites/posts/createPost/ui/steps/Step2Crop/CropStep.module.scss'

type Props = {
    zoom: number
    onZoomChange: (zoom: number) => void
}

export const ZoomPanel = ({ zoom, onZoomChange }: Props) => {
    const handleZoomIn = () => {
        onZoomChange(Math.min(3, zoom + 0.1))
    }

    const handleZoomOut = () => {
        onZoomChange(Math.max(1, zoom - 0.1))
    }

    return (
        <div className={s.zoomPanel}>
            <div className={s.toolsSection}>
                    <input
                        type="range"
                        min={1}
                        max={3}
                        step={0.1}
                        value={zoom}
                        onChange={e => onZoomChange(+e.target.value)}
                        className={s.zoomSlider}
                        title="Регулировка приближения"
                    />
                    <div className={s.zoomButtons}>
                        <button
                            onClick={handleZoomOut}
                            className={s.zoomButton}
                            title="Уменьшить"
                        >
                            -
                        </button>
                        <button
                            onClick={handleZoomIn}
                            className={s.zoomButton}
                            title="Увеличить"
                        >
                            +
                        </button>
                </div>
            </div>
        </div>
    )
}