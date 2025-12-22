'use client'

import { ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'
import styles from './SuperModal.module.scss'
import { IconButton } from '@/shared/ui/IconButton/IconButton'
import {Button} from "@/shared/ui/Button/Button";

interface Modal {
    isOpen: boolean
    onClose: () => void
    children: ReactNode
    title?: string

    headerLeft?: ReactNode
    headerRight?: ReactNode
}


export const SuperModal = (props: Modal) => {
    const { isOpen, onClose, children, title } = props

    const onClickHandler = () => {
        onClose()
    }

    // Блокировка скролла при открытии модалки
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    // Закрытие по ESC
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    return createPortal(
        <div className={styles.backdrop} onClick={handleBackdropClick}>
            <div className={styles.modal}>
                <div className={styles.header}>

                    <div className={styles.headerSide}>
                        {props.headerLeft}
                    </div>

                    <h2 className={styles.title}>{title}</h2>

                    <div className={styles.headerSide}>
                        {props.headerRight ?? (
                            <IconButton
                                iconId="logoutBtnCloseSvg"
                                fill="white"
                                size={24}
                                onClick={onClose}
                            />
                        )}
                    </div>

                </div>
                <div className={styles.content}>{children}</div>
            </div>
        </div>,
        document.body
    )
}
