'use client'

import { ReactNode, useCallback } from 'react'
import { CreatePostModal } from '@/entites/posts/createPost/ui/CreatePostModals/CreatePostModal'
import { Button } from '@/shared/ui/Button/Button'

type ConfirmationDialogProps = {
    isOpen: boolean
    title: string
    description: ReactNode

    confirmLabel?: string //Тексты кнопок
    cancelLabel?: string


    onConfirm?: () => void
    onCancel?: () => void

    isLoading?: boolean
}

export const ConfirmationDialog = ({
                                       isOpen, //показать / скрыть модалку
                                       title, // заголовок
                                       description, // содержимое (текст, JSX, что угодно)

                                       confirmLabel = 'OK', // кастомные подписи кнопок
                                       cancelLabel = 'Cancel',

                                       onConfirm, // что делать при OK
                                       onCancel, // что делать при Cancel

                                       isLoading = false, // дизейблит кнопки, защищает от двойных кликов
                                   }: ConfirmationDialogProps) => {
    const isConfirmDialog = typeof onCancel === 'function'
    // Если передали onCancel, значит это диалог подтверждения
    // это просто информационное окно
    // будет только одна кнопка


    const handleClose = useCallback(() => {
        if (isConfirmDialog) {
            onCancel?.()
        }
    }, [isConfirmDialog, onCancel])

    const footer = (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '94px',
            }}
        >
            {isConfirmDialog && (
                <Button
                    variant="outline"
                    onClick={onCancel}
                    disabled={isLoading}
                    width={100}
                >
                    {cancelLabel}
                </Button>
            )}

            {onConfirm && (
                <Button
                    variant="primary"
                    onClick={onConfirm}
                    disabled={isLoading}
                    width={100}
                >
                    {confirmLabel}
                </Button>
            )}
        </div>
    )

    return (
        <CreatePostModal
            isOpen={isOpen}
            title={title}
            footer={footer}
            onClose={handleClose}
            closeOnBackdrop
            closeOnEsc
            style={{ padding: '24px' }}
        >
            <div>{description}</div>
        </CreatePostModal>
    )
}
