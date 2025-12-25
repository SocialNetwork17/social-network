'use client'

import React, { ChangeEvent, useRef } from 'react'
import type { ImageItem } from '@/entites/posts/createPost/model/types'
import { v4 as uuidv4 } from 'uuid'
import {Button} from "@/shared/ui/Button/Button";
import {Icon} from "@/shared/ui/Icon/Icon";
import s from './UploadStep.module.scss'

type Props = {
    images: ImageItem[]
    setImages: (imgs: ImageItem[]) => void
    onNext: () => void
}

const MAX_SIZE = 20 * 1024 * 1024
const ALLOWED = ['image/jpeg', 'image/png']

export const UploadStep = ({ images, setImages, onNext }: Props) => {
    const ref = useRef<HTMLInputElement | null>(null)

    //Скрыть нативный input и использовать красивую кнопку, которая триггерит клик на скрытом input.
    const trigger = () => ref.current?.click()

    //обработки выбора файлов через элемент <input type="file">
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

        const files = e.target.files
        if (!files || files.length === 0) return

        const newItems: ImageItem[] = []
        for (let i = 0; i < files.length; i++) {
            const f: File = files.item(i)!
            if (!ALLOWED.includes(f.type)) {
                alert('The photo must be JPEG or PNG')
                continue //Без continue пришлось бы делать вложенные условия:
            }
            if (f.size > MAX_SIZE) {
                alert('The photo must be less than 20 Mb')
                continue
            }
            const url = URL.createObjectURL(f)
            newItems.push({
                id: uuidv4(),
                file: f,
                url,
                crop: { x: 0, y: 0 },
                zoom: 1,
                aspect: 1,
                rotation: 0,
                croppedAreaPixels: null,
                croppedBlob: null,
            })
        }

        if (newItems.length) {
            setImages([...images, ...newItems])
            onNext()
        }

        e.currentTarget.value = ''
    }

    return (
        <div className={s.addPhotoWrapper}>
            <div className={s.iconWrapper}>
                <Icon iconId={'create-post-icon'} size={48} fill={'white'} viewBox={'0 0 48 48'}/>
            </div>

            {/*<p>Select photo (JPEG/PNG, max 20MB)</p>*/}
            <Button
                disabled={false}
                variant={"primary"}
                onClick={trigger}>Select from Computer</Button>
            <input
                ref={ref}
                type="file"
                accept="image/jpeg,image/png"
                multiple
                style={{ display: 'none' }} //скрыт
                onChange={handleChange} />
        </div>
    )
}
