'use client'
import React, {forwardRef, HTMLInputTypeAttribute, useState} from 'react'
import styles from './Input.module.scss'
import {IconButton} from '../IconButton/IconButton'
import {getIconIdByInputType} from "@/shared/ui/Input/helpers/getIconByInputType";

type Props = {
    label: string
    type: HTMLInputTypeAttribute
    placeholder: string
    required: boolean
    error?: boolean
    errorText?: string
    disabled?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
    const {
        label,
        type,
        placeholder,
        required,
        error,
        errorText,
        disabled,
        ...rest
    } = props

    const [inputType, setInputType] = useState<HTMLInputTypeAttribute>(type)

    const onClickHandler = () => {
        if (disabled) return
        if(inputType === "date")  {
            //onClick()
            return
        }
        setInputType(prev => (prev === 'password' ? 'text' : 'password'))
    }

    const iconForInput = getIconIdByInputType(type, inputType)

    const inputClassName = error ? `${styles.input} ${styles.errorInput}` : `${styles.input}`

    return (
        <div className={styles.inputContainer}>
            <label className={styles.label}>
                {label}
                {required && <sup className={styles.requiredStar}>*</sup>}
                <div className={styles.inputWrapper}>
                    <input
                        className={inputClassName}
                        disabled={disabled}
                        ref={ref}
                        type={inputType}
                        placeholder={placeholder}
                        {...rest}
                    />
                    <div className={styles.iconButtonContainer}>
                        {(type === 'password' || type === "date") && (
                            <IconButton
                                iconId={iconForInput}
                                size={24}
                                viewBox={'0 0 24 24'}
                                disabled={disabled}
                                onClick={onClickHandler}
                            />
                        )}
                    </div>
                </div>
            </label>
            {error && <div className={styles.errorText}>{errorText}</div>}
        </div>
    )
})