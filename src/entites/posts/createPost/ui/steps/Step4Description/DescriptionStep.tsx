import React, {useMemo} from 'react'
import type {ImageItem} from '@/entites/posts/createPost/api/types'
import Card from '@/shared/ui/Card/Card'
import s from './DescriptionStep.module.scss'
import { useDataMyProfileQuery } from '@/pages/profile/api/useDataMyProfileQuery'
import UserName from '@/shared/ui/UserName/UserName'

type Props = {
    images: ImageItem[]
    description: string
    setDescription: (s: string) => void
}

export const DescriptionStep = ({ images, description, setDescription }: Props) => {

    // useMemo тут нужен, чтобы не пересчитывать список картинок каждый раз, когда ты печатаешь текст описания.
    const previewUrls = useMemo(() =>
            images.map(img => img.croppedPreviewUrl || img.url),
        [images])

      const { data: userInfo } = useDataMyProfileQuery()


    return (
        <div className={s.container}>
            
            <div className={s.imageSection}>
                <div className={s.imageContainer}>
                    {previewUrls.length > 0 ? (
                        <Card
                            images={previewUrls}
                            slider={previewUrls.length > 1}
                            alt="Publication preview"
                        />
                    ) : (
                        <div className={s.error}>No images processed</div>
                    )}
                </div>
            </div>

            <div className={s.descriptionSection}>
                {userInfo &&<UserName userInfo={userInfo} />}
                <div className={s.textareaContainer}>
                    <span className={s.sectionSubtitle}>Add publication descriptions</span>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Text-area"
                        className={s.textarea}
                        maxLength={500}
                    />
                    <div className={s.charCounter}>{description.length}/500</div>
                </div>
            </div>
        </div>
    )
}