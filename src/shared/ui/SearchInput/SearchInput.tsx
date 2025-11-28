'use client'
import React, { ChangeEvent, memo, useEffect, useState } from 'react'
import styles from './SearchInput.module.scss'
import { IconButton } from '../IconButton/IconButton'

type Props = {
  placeholder: string
  error?: boolean
  errorText?: string
  disabled?: boolean
}

export const SearchInput = memo((props: Props) => {
  const { placeholder, error, errorText, disabled } = props

  const [value, setValue] = useState<string>('')
  const [hasError, setHasError] = useState(!!error)

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
    error && setHasError(false)
  }

  const onClickHandler = () => {}
  const onKeyPressHandler = () => {}

  useEffect(() => {
    setHasError(!!error)
  }, [error])

  const inputClassname = hasError ? `${styles.input} ${styles.errorInput}` : `${styles.input}`

  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputWrapper}>
        <input
          value={value}
          className={inputClassname}
          type={'text'}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
          placeholder={placeholder}
          disabled={disabled}
        />
        <div className={styles.iconButtonContainer}>
          <IconButton
            iconId={'searchIcon'}
            width={'24'}
            height={'24'}
            viewBox={'0 0 24 24'}
            disabled={disabled}
            onClick={onClickHandler}
          />
        </div>
      </div>
      {hasError && <div className={styles.errorText}>{errorText}</div>}
    </div>
  )
})
