import React from 'react'
import s from './SuperCheckbox.module.scss'

type SuperCheckboxProps = {
    onChangeChecked?: (checked: boolean) => void
    children?: React.ReactNode
    disabled?: boolean
    checked?: boolean
    id?: string
}

export const SuperCheckbox = ({ onChangeChecked, children, disabled, checked, id }: SuperCheckboxProps) => {
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
                onChange={(e) => onChangeChecked?.(e.target.checked)}
                className={s.checkbox}
            />
            <svg className={s.customCheckbox} width="18" height="18">
                <use xlinkHref={`/icons/SuperCheckbox.svg#${getIconId()}`} />
            </svg>
            {children && <span className={s.spanClassName}>{children}</span>}
        </label>
    )
}