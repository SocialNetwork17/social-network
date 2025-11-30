'use client'
import s from './LogOut.module.scss'
import React, { useState, useEffect, useRef } from 'react'

type LogOutProps = {
  email?: string
  onConfirmAction?: () => void // Колбэк при подтверждении выхода
  onCloseAction?: () => void // Колбэк при закрытии модалки
  isOpen?: boolean
}

export const LogOut = ({
  email = 'Epam@epam.com', // Значение email по умолчанию
  onConfirmAction,
  onCloseAction,
  isOpen = false, // По умолчанию модалка скрыта
}: LogOutProps) => {
  // Состояние для управления анимацией закрытия
  const [isClosing, setIsClosing] = useState(false)

  // Ref для хранения идентификатора таймера
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Эффект очистки при размонтировании компонента
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, []) // Пустой массив зависимостей = выполняется только при размонтировании

  const handleClose = () => {
    setIsClosing(true) // Активируем анимацию исчезновения

    // Сохраняем таймер в ref для возможности очистки
    timeoutRef.current = setTimeout(() => {
      setIsClosing(false)
      onCloseAction?.() // Уведомляем родительский компонент о закрытии
    }, 300) // Таймаут должен совпадать с длительностью CSS-анимации
  }

  // Обработчик подтверждения выхода
  const handleClickYes = () => {
    onConfirmAction?.() // Вызываем колбэк подтверждения выхода
    handleClose()
  }

  // Обработчик клика по оверлею
  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      handleClose()
    }
  }

  // не отображаем компонент если модалка закрыта
  if (!isOpen) return null

  return (
    <div
      className={`${s.logoutWrapper} ${isClosing ? s.wrapperDisappear : ''}`}
      onClick={handleOverlayClick} // Закрытие по клику на оверлей
    >
      <div className={`${s.logoutModal} ${isClosing ? s.modalDisappear : ''}`}>
        <div className={s.logoutHeader}>
          <h3 className={s.logoutTitle}>Log Out</h3>

          <button
            className={s.logoutBtnClose}
            onClick={handleClose}
            aria-label="Close logout dialog" // Для доступности (скринридеры)
          >
            <svg className={s.logoutBtnCloseSvg} width="24" height="24">
              <use xlinkHref="/icons-sprite.svg#logoutBtnCloseSvg" />
            </svg>
          </button>
        </div>

        <div className={s.logoutBody}>
          <p className={s.logoutText}>
            Are you really want to log out of your account &#34;
            <span className={s.logoutEmail}>{email}</span>&#34;?
          </p>

          <div className={s.logoutButtons}>
            <button className={`${s.logoutBtn} ${s.logoutBtnYes}`} onClick={handleClickYes}>
              Yes
            </button>

            <button className={`${s.logoutBtn} ${s.logoutBtnNo}`} onClick={handleClose}>
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
