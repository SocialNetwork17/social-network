'use client'

import {ReactNode} from 'react'
import styles from './CreatePostModal.module.scss'
import {IconButton} from '@/shared/ui/IconButton/IconButton'

type CreateModalProps = {
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
                                    onClose,
                                    children,

                                    title,
                                    headerLeft,
                                    headerRight,
                                    footer,
                                    style,
                                }: CreateModalProps) => {


    return (
        <>
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
        </>
    )
}
