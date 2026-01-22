'use client'

import {useEffect, useState} from 'react'
import styles from './ImageModal.module.scss'
import Card from '../../Card/Card'
import {SchemaPostViewModel} from '@/shared/api/schema'
import {EditPostHeader} from "@/shared/ui/Modal/ImageModal/EditPostHeader/EditPostHeader";
import ImageModalHeader from "@/shared/ui/Modal/ImageModal/ImageModalHeader/ImageModalHeader";
import {useDataProfileQuery} from "@/pages/profile/api/useDataProfileQuery";
import {useUpdatePostMutation} from '@/shared/api/useUpdatePostMutation'
import {usePostQuery} from "@/shared/api/usePostQuery";
import { useModal } from '@/widgets/modal/model/modal.context'
import { openViewPostModalAC } from '@/widgets/modal/model/modal.types'
import {Button} from "@/shared/ui/Button/Button";

type Mode = 'view' | 'edit'

type Props = {
    isOpen: boolean
    onClose: () => void
    postInfo?: SchemaPostViewModel
    alt?: string
    isLoading?: boolean
    postId?: number
    mode?: Mode
}


export default function ImageModal(props: Props) {
    const {isOpen, onClose, postId, alt = '', mode} = props

    const [text, setText] = useState('')
    const { pushModal } = useModal()
    const {mutateAsync, isPending} = useUpdatePostMutation()
    const { data: postInfo, isLoading } = usePostQuery(postId)

    //const {data} = useDataProfileQuery()

    // Блокируем скролл при открытии модалки
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
            document.addEventListener('keydown', handleEscapeKey)
        }

        return () => {
            document.body.style.overflow = 'unset'
            document.removeEventListener('keydown', handleEscapeKey)
        }
    }, [isOpen])

    useEffect(() => {
        if (postInfo && mode === 'edit') {
            setText(postInfo.description)
        }
    }, [postInfo, mode])


    const handleEscapeKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose()
        }
    }

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    if (isLoading || !postInfo) return null
    const imageSlider = postInfo.images.map(image => image.url)

    const handlePostDeleted = () => {
        onClose() // Закрываем родительскую модалку после удаления
    }

    const handleSave = async () => {
        await mutateAsync({
            postId: postInfo!.id,
            description: text,
        })
        onClose()
        pushModal(openViewPostModalAC({ postId: postInfo!.id }))
    }

    const handleCancelEdit = () => {
        onClose()
        pushModal(openViewPostModalAC({ postId: postInfo!.id }))
    }

    if (!isOpen) return null

    return (
        <div
            className={styles.modalBackdrop}
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-label="Увеличенное изображение"
        >


            <div className={styles.modalContent}>

                {mode === 'edit' && (
                    <EditPostHeader
                        onCancel={handleCancelEdit}
                    />
                )}

                <Card images={imageSlider} slider={true} width={490} height={564}/>
                <div className={styles.modalDescription}>


                    <ImageModalHeader
                        postId={postInfo.id}
                        onPostDeleted={handlePostDeleted}
                    />
                    {/*{postInfo.description}*/}

                    {mode === 'view' && (
                        <div>{postInfo.description}</div>
                    )}

                    {mode === 'edit' && (
                        <div className={styles.editSection}>

                            <p className={styles.helpText}>
                                Add publication descriptions
                            </p>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className={styles.textarea}
                            />

                            <div className={styles.saveButton}>
                                <Button
                                    variant={'primary'}
                                    onClick={handleSave}
                                    disabled={isPending || text === postInfo.description}
                                >
                                    {isPending ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </div>

                        </div>
                    )}


                </div>

                <button
                    onClick={onClose}
                    className={styles.closeButton}
                    aria-label="Закрыть модальное окно"
                >
                    ✕
                </button>
            </div>
        </div>
    )
}
