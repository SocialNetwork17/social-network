'use client'
import React, { ChangeEvent, HTMLInputTypeAttribute, memo, useEffect, useState } from 'react'
import styles from './Input.module.scss'
import { IconButton } from '../IconButton/IconButton'

type Props = {
  label: string
  type: HTMLInputTypeAttribute
  placeholder: string
  required: boolean
  error?: boolean
  errorText?: string
  disabled?: boolean
}
//подправить стиль errorText, когда будем собирать все компоненты в карточку регистрации
export const Input = memo((props: Props) => {
  const { label, type, placeholder, required, error, errorText, disabled } = props

  const [inputType, setInputType] = useState<HTMLInputTypeAttribute>(type)
  const [hasError, setHasError] = useState(!!error)

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    error && setHasError(false)
  }

  const onClickHandler = () => {
    if (disabled) return
    setInputType(prev => (prev === 'password' ? 'text' : 'password'))
  }

  //useEffect используем для синхронизации изменения значения error, если через пропсы приходит новое значение error
  //переназначаем значение error
  useEffect(() => {
    setHasError(!!error)
  }, [error])

  const inputClassName: string = hasError ? `${styles.input} ${styles.errorInput}` : `${styles.input}`

  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>
        {label}
        {required && <sup className={styles.requiredStar}>*</sup>}
        <div className={styles.inputWrapper}>
          <input
            className={inputClassName}
            type={inputType}
            placeholder={placeholder}
            onChange={onChangeHandler}
            disabled={disabled}
          />
          <div className={styles.iconButtonContainer}>
            {type === 'password' && (
              <IconButton
                iconId={inputType === 'password' ? 'eyeClosed' : 'eyeOpen'}
                size={24}
                viewBox={'0 0 24 24'}
                disabled={disabled}
                onClick={onClickHandler}
              />
            )}
          </div>
        </div>
      </label>
      {hasError && <div className={styles.errorText}>{errorText}</div>}
    </div>
  )
})
