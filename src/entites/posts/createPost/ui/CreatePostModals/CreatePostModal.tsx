
'use client'

import { ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'
import styles from './CreatePostModal.module.scss'
import { IconButton } from '@/shared/ui/IconButton/IconButton'

type CreateModalProps = {
    isOpen: boolean
    onClose: () => void
    children: ReactNode

    title?: string
    headerLeft?: ReactNode
    headerRight?: ReactNode
    footer?: ReactNode

    closeOnBackdrop?: boolean
    closeOnEsc?: boolean

    style?: React.CSSProperties
}

export const CreatePostModal = ({
                                    isOpen,
                                    onClose,
                                    children,

                                    title,
                                    headerLeft,
                                    headerRight,
                                    footer,

                                    closeOnBackdrop = true,
                                    closeOnEsc = true,

                                    style,
                                }: CreateModalProps) => {

    // scroll lock
    useEffect(() => {
        if (!isOpen) return
        const original = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = original
        }
    }, [isOpen])

    // ESC
    useEffect(() => {
        if (!isOpen || !closeOnEsc) return

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }

        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [isOpen, closeOnEsc, onClose])

    if (!isOpen) return null

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (!closeOnBackdrop) return
        if (e.target === e.currentTarget) onClose()
    }

    return createPortal(
        <div className={styles.backdrop} onClick={handleBackdropClick}>
            <div
                className={styles.modal}
                role="dialog"
                aria-modal="true"
            >
                {(title || headerLeft || headerRight) && (
                    <div className={styles.header}>
                        <div className={styles.headerSide}>{headerLeft}</div>

                        {title && <h2 className={styles.title}>{title}</h2>}

                        <div className={styles.headerSide}>
                            {headerRight ?? (
                                <IconButton
                                    iconId="logoutBtnCloseSvg"
                                    fill="white"
                                    size={24}
                                    onClick={onClose}
                                />
                            )}
                        </div>
                    </div>
                )}

                <div className={styles.content}
                     style={style}
                >{children}</div>

                {footer && <div className={styles.footer}>{footer}</div>}
            </div>
        </div>,
        document.body
    )
}
