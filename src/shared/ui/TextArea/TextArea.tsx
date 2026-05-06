'use client'
import React, { ChangeEvent, memo, useEffect, useRef, useState } from 'react'
import styles from './TextArea.module.scss'

type Props = {
  label: string
  maxLength?: number
  value?: string
  error?: boolean
  errorText?: string
  disabled?: boolean
  placeholder?: string
  onChange: (value: string) => void
  minRows?: number // минимальное количество строк
  maxRows?: number // максимальное количество строк
  variant?: "default" | "simple"
  showCounter?: boolean
}

export const TextArea = memo((props: Props) => {
  const {
    label,
    maxLength,
    error,
    errorText,
    disabled,
    placeholder,
    onChange,
    value,
    minRows = 1,
    maxRows = 5,
    variant = "default",
    showCounter = true
  } = props

  const [internalValue, setInternalValue] = useState<string>(value || '')
  const [hasError, setHasError] = useState<boolean>(!!error)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value)
    }
  }, [value])

  // Функция для автоматического изменения высоты
  const autoResize = () => {
    const textarea = textareaRef.current
    if (!textarea) return

    // Сбрасываем высоту, чтобы получить корректную scrollHeight
    textarea.style.height = 'auto'

    // Вычисляем новую высоту
    const lineHeight = parseInt(getComputedStyle(textarea).lineHeight)
    const minHeight = lineHeight * minRows
    const maxHeight = lineHeight * maxRows

    let newHeight = textarea.scrollHeight

    // Ограничиваем высоту
    if (newHeight > maxHeight) {
      newHeight = maxHeight
      textarea.style.overflowY = 'auto'
    } else {
      textarea.style.overflowY = 'hidden'
    }

    if (newHeight < minHeight) {
      newHeight = minHeight
    }

    textarea.style.height = `${newHeight}px`
  }

  useEffect(() => {
    autoResize()
  }, [internalValue, minRows, maxRows])

  const onChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.currentTarget.value
    setInternalValue(newValue)
    onChange(newValue)
    if (error) setHasError(false)
    autoResize()
  }

  useEffect(() => {
    setHasError(!!error)
  }, [error])

   // Формируем классы в зависимости от variant
  const getTextAreaClassname = () => {
    const baseClass = variant === 'simple' ? styles.simpleTextArea : styles.textArea
    
    if (hasError) {
      return variant === 'simple' 
        ? `${baseClass} ${styles.errorText}`
        : `${baseClass} ${styles.errorTextArea}`
    }
    
    return baseClass
  }

  const textAreaClassname = getTextAreaClassname()

  return (
    <div className={styles.textAreaContainer}>
      <label className={styles.label}>
        {label}
        <textarea
          ref={textareaRef} // Используется для динамичсекой высоты
          value={internalValue} // Используем наш синхронизированный стейт
          className={textAreaClassname}
          disabled={disabled}
          onChange={onChangeHandler}
          placeholder={placeholder}
          maxLength={maxLength || 500}
          rows={minRows}  // Начальное количество строк
        />
        {showCounter && (<div className={styles.charCounter}>
          {internalValue.length}/{maxLength || 500}
        </div>)}
      </label>
      {hasError && <div className={styles.errorText}>{errorText}</div>}
    </div>
  )
})
