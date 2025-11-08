"use client"
import s from './LogOut.module.scss'
import React, {useState, useEffect} from "react"

interface LogOutProps {
    email?: string
    onConfirm?: () => void
    onClose?: () => void
    isOpen?: boolean
}

export const LogOut = ({
                           email = "Epam@epam.com",
                           onConfirm,
                           onClose,
                           isOpen = false
                       }: LogOutProps) => {
    const [internalIsOpen, setInternalIsOpen] = useState(isOpen)
    const [isClosing, setIsClosing] = useState(false)

    // Синхронизируем внутреннее состояние с внешним пропсом
    useEffect(() => {
        setInternalIsOpen(isOpen)
    }, [isOpen])

    const handleClose = () => {
        setIsClosing(true)
        setTimeout(() => {
            setInternalIsOpen(false)
            setIsClosing(false)
            onClose?.()
        }, 300)
    }

    const handleClickYes = () => {
        onConfirm?.()
        handleClose()
    }

    const handleOverlayClick = (event: React.MouseEvent) => {
        if (event.target === event.currentTarget) {
            handleClose()
        }
    }

    if (!internalIsOpen) return null

    return (
        <div
            className={`${s.logoutWrapper} ${isClosing ? s.wrapperDisappear : ''}`}
            onClick={handleOverlayClick}
        >
            <div className={`${s.logoutModal} ${isClosing ? s.modalDisappear : ''}`}>
                <div className={s.logoutHeader}>
                    <h3 className={s.logoutTitle}>Log Out</h3>
                    <button
                        className={s.logoutBtnClose}
                        onClick={handleClose}
                        aria-label="Close logout dialog"
                    >
                        <svg className={s.logoutBtnCloseSvg} width="24" height="24">
                            <use xlinkHref="icons-sprite.svg#logoutBtnCloseSvg" />
                        </svg>
                    </button>
                </div>
                <div className={s.logoutBody}>
                    <p className={s.logoutText}>
                        Are you really want to log out of your account
                        &#34;<span className={s.logoutEmail}>{email}</span>&#34;?
                    </p>
                    <div className={s.logoutButtons}>
                        <button
                            className={`${s.logoutBtn} ${s.logoutBtnYes}`}
                            onClick={handleClickYes}
                        >
                            Yes
                        </button>
                        <button
                            className={`${s.logoutBtn} ${s.logoutBtnNo}`}
                            onClick={handleClose}
                        >
                            No
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}