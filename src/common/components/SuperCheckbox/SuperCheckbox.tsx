'use client'
import React from 'react'
import s from './SuperCheckbox.module.scss'

type SuperCheckboxProps = {
    onChangeCheckedAction?: (checked: boolean) => void
    children?: React.ReactNode
    disabled?: boolean
    checked?: boolean
    id?: string
}

export const SuperCheckbox = ({ onChangeCheckedAction, children, disabled, checked, id }: SuperCheckboxProps) => {
    const getIconId = () => {
        if (disabled) {
            return checked ? 'disabled-selected-box' : 'disabled-unselected-box'
        }
        return checked ? 'selected-box' : 'unselected-box'
    }

    return (
        <label className={`${s.label} ${disabled ? s.disabled : ''}`} htmlFor={id}>
            <input
                id={id}
                type="checkbox"
                disabled={disabled}
                checked={checked}
                onChange={(e) => onChangeCheckedAction?.(e.target.checked)}
                className={s.checkbox}
            />
            <svg className={s.customCheckbox} width="18" height="18">
                <use xlinkHref={`/icons/sprite.svg#${getIconId()}`} />
            </svg>
            {children && <span className={s.spanClassName}>{children}</span>}
        </label>
    )
}