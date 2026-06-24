'use client'
import React from 'react'
import s from './Checkbox.module.scss'

type CheckboxProps = {
  onChangeCheckedAction?: (checked: boolean) => void
  label?: string
  disabled?: boolean
  checked?: boolean
  id?: string
}

export const Checkbox = ({
  onChangeCheckedAction,
  label,
  disabled,
  checked,
  id,
  ...rest
}: CheckboxProps) => {
  const getIconId = () => {
    if (disabled) {
      return checked ? 'disabled-selected-box' : 'disabled-unselected-box'
    }
    return checked ? 'selected-box' : 'unselected-box'
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.currentTarget.checked
    onChangeCheckedAction?.(checked)
  }

  return (
    <label className={`${s.label} ${disabled ? s.disabled : ''}`} htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        disabled={disabled}
        checked={checked}
        onChange={handleChange}
        className={s.checkbox}
        {...rest}
      />
      <svg className={s.customCheckbox} width="18" height="18">
        <use xlinkHref={`icons-sprite.svg#${getIconId()}`} />
      </svg>
      {label && <span className={s.spanClassName}>{label}</span>}
    </label>
  )
}
