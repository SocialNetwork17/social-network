'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'
import type { ImageItem } from '@/entites/posts/createPost/model/types'
import { getCroppedImg } from '../../../lib/imageUtils'

type Props = {
    image?: ImageItem
    onUpdate: (partial: Partial<ImageItem>) => void
    onApplyRef?: (fn: () => Promise<void>) => void
}

export const CropStep = ({ image, onUpdate, onApplyRef }: Props) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [aspect, setAspect] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

    const applyCrop = useCallback(async () => {
        if (!image || !croppedAreaPixels) return

        try {
            const blob = await getCroppedImg(image.url, croppedAreaPixels)
            const previewUrl = URL.createObjectURL(blob)

            onUpdate({
                crop,
                zoom,
                aspect,
                croppedAreaPixels,
                croppedBlob: blob,
                croppedPreviewUrl: previewUrl,
            })
        } catch (err) {
            console.error(err)
            alert('Crop failed')
        }
    }, [image, crop, zoom, aspect, croppedAreaPixels, onUpdate])
    // 🔹 инициализация из ImageItem при переключении activeIndex
    useEffect(() => {
        if (!image) return

        setCrop(image.crop ?? { x: 0, y: 0 })
        setZoom(image.zoom ?? 1)
        setAspect(image.aspect ?? 1)
    }, [image])

    // 🔹 передаём функцию наружу, чтобы CreatePostModal мог вызвать applyCrop перед Next
    useEffect(() => {
        if (onApplyRef) {
            onApplyRef(applyCrop)
        }
    }, [applyCrop, onApplyRef])



    const onCropComplete = useCallback(
        (_croppedArea: Area, croppedAreaPixels: Area) => {
            setCroppedAreaPixels(croppedAreaPixels)
        },
        []
    )

    if (!image) return null

    return (
        <div
            style={{
                width: 492,
                height: 564,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Crop area */}
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    height: 380,
                    background: '#222',
                }}
            >
                <Cropper
                    image={image.url}
                    crop={crop}
                    zoom={zoom}
                    aspect={aspect}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                />
            </div>

            {/* Tools */}
            <div
                style={{
                    padding: 12,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                    flexGrow: 1,
                }}
            >
                <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => setAspect(1)}>1:1</button>
                    <button onClick={() => setAspect(4 / 5)}>4:5</button>
                    <button onClick={() => setAspect(16 / 9)}>16:9</button>
                    <button onClick={() => setAspect(9 / 16)}>9:16</button>
                </div>

                <div>
                    <label>Zoom</label>
                    <input
                        type="range"
                        min={1}
                        max={3}
                        step={0.01}
                        value={zoom}
                        onChange={e => setZoom(+e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}
