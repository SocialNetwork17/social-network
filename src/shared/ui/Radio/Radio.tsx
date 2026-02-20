'use client'
import React from 'react'
import s from './Radio.module.scss'
import {Icon} from "@/shared/ui/Icon/Icon";

type RadioProps = {
    onChangeCheckedAction?: (checked: boolean) => void
    label?: string
    disabled?: boolean
    checked?: boolean
    id?: string
    name?: string
    value?: string
    className?: string
}

export const Radio = ({
                          onChangeCheckedAction,
                          label,
                          disabled,
                          checked,
                          id,
                          name,
                          value,
                          className,
                          ...rest
                      }: RadioProps) => {
    const getIconId = () => {
        if (disabled) {
            return checked ? 'disabled-selected-radio' : 'disabled-unselected-radio'
        }
        return checked ? 'selected-radio' : 'unselected-radio'
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.currentTarget.checked
        onChangeCheckedAction?.(checked)
    }

    return (
        <label
            className={`${s.label} ${disabled ? s.disabled : ''} ${className || ''}`}
            htmlFor={id}
        >
            <input
                id={id}
                type="radio"
                disabled={disabled}
                checked={checked}
                onChange={handleChange}
                className={s.radio}
                name={name}
                value={value}
                {...rest}
            />
            <Icon
                className={s.customRadio}
                iconId={getIconId()} size={24} viewBox={'0 0 24 24'}
            />

            {label && <span className={s.spanClassName}>{label}</span>}
        </label>
    )
}