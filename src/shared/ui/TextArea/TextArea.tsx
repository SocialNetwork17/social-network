'use client'
import { ChangeEvent, memo, useEffect, useState } from 'react'
import styles from './TextArea.module.scss'

type Props = {
  label: string
  error?: boolean
  errorText?: string
  disabled?: boolean
  placeholder: string
  onChange: (value: string) => void
}
export const TextArea = memo((props: Props) => {
  const { label, error, errorText, disabled, placeholder, onChange } = props

  const [value, setValue] = useState<string>('')
  const [hasError, setHasError] = useState<boolean>(!!error)

  const onChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.currentTarget.value)
    onChange(event.currentTarget.value)
    error && setHasError(false)
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
          value={value}
          className={textAreaClassname}
          disabled={disabled}
          onChange={onChangeHandler}
          placeholder={placeholder}
        />
      </label>
      {hasError && <div className={styles.errorText}>{errorText}</div>}
    </div>
  )
})
