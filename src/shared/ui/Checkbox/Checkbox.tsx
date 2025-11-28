'use client'
import React, { useState } from 'react'
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
}: CheckboxProps) => {
  // Use checked as controlled value if provided
  // Otherwise use internal state
  const [internalChecked, setInternalChecked] = useState(false)

  // Determine whether to use controlled or uncontrolled state
  const isControlled = checked !== undefined
  const isChecked = isControlled ? checked : internalChecked

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked

    if (!isControlled) {
      // If component is uncontrolled, update internal state
      setInternalChecked(newChecked)
    }

    // Always call the callback
    onChangeCheckedAction?.(newChecked)
  }

  const getIconId = () => {
    if (disabled) {
      return isChecked ? 'disabled-selected-box' : 'disabled-unselected-box'
    }
    return isChecked ? 'selected-box' : 'unselected-box'
  }

  return (
    <label className={`${s.label} ${disabled ? s.disabled : ''}`} htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        disabled={disabled}
        checked={isChecked}
        onChange={handleChange}
        className={s.checkbox}
      />
      <svg className={s.customCheckbox} width="18" height="18">
        <use xlinkHref={`icons-sprite.svg#${getIconId()}`} />
      </svg>
      {label && <span className={s.spanClassName}>{label}</span>}
    </label>
  )
}
