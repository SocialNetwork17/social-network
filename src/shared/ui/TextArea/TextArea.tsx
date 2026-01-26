'use client'
import React, { ChangeEvent, memo, useEffect, useState } from 'react'
import styles from './TextArea.module.scss'


type Props = {
  label: string
  value?: string
  error?: boolean
  errorText?: string
  disabled?: boolean
  placeholder?: string
  onChange: (value: string) => void
}

export const TextArea = memo((props: Props) => {
  const { label, error, errorText, disabled, placeholder, onChange, value } = props

  const [internalValue, setInternalValue] = useState<string>(value || '')
  const [hasError, setHasError] = useState<boolean>(!!error)

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value)
    }
  }, [value])

  const onChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.currentTarget.value
    setInternalValue(newValue)
    onChange(newValue)
    if (error) setHasError(false)
  }

  useEffect(() => {
    setHasError(!!error)
  }, [error])

  const textAreaClassname: string = hasError
      ? `${styles.textArea} ${styles.errorTextArea}`
      : `${styles.textArea}`

  return (
      <div className={styles.textAreaContainer}>
        <label className={styles.label}>
          {label}
          <textarea
              value={internalValue} // Используем наш синхронизированный стейт
              className={textAreaClassname}
              disabled={disabled}
              onChange={onChangeHandler}
              placeholder={placeholder}
              maxLength={500}
          />
          <div className={styles.charCounter}>{internalValue.length}/500</div>
        </label>
        {hasError && <div className={styles.errorText}>{errorText}</div>}
      </div>
  )
})