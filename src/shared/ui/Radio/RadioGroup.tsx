'use client'
import React, { useEffect } from 'react'
import { Radio } from './Radio'
import s from './RadioGroup.module.scss'

type RadioOption = {
    value: string
    label: string
    disabled?: boolean
    checked?: boolean
}

type RadioGroupProps = {
    options: RadioOption[]
    name: string
    value?: string
    onChange?: (value: string) => void
    disabled?: boolean
    label?: string
    direction?: 'vertical' | 'horizontal'
}

export const RadioGroup = ({
                               options,
                               name,
                               value: externalValue,
                               onChange,
                               disabled,
                               label,
                               direction = 'vertical',
                           }: RadioGroupProps) => {
    // Находим опцию с checked=true, если externalValue не передан
    const initialValue = React.useMemo(() => {
        if (externalValue !== undefined) return externalValue
        const checkedOption = options.find(opt => opt.checked)
        return checkedOption?.value || ''
    }, [options, externalValue])

    const [selectedValue, setSelectedValue] = React.useState(initialValue)

    // Синхронизируем с внешним значением, если оно предоставлено
    useEffect(() => {
        if (externalValue !== undefined) {
            setSelectedValue(externalValue)
        }
    }, [externalValue])

    const handleChange = (optionValue: string, checked: boolean) => {
        if (checked) {
            setSelectedValue(optionValue)
            onChange?.(optionValue)
        }
    }

    return (
        <div className={s.group}>
            {label && <span className={s.groupLabel}>{label}</span>}
            <div className={`${s.radioList} ${s[direction]}`}>
                {options.map((option) => (
                    <Radio
                        key={option.value}
                        id={`${name}-${option.value}`}
                        name={name}
                        label={option.label}
                        value={option.value}
                        checked={selectedValue === option.value}
                        disabled={disabled || option.disabled}
                        onChangeCheckedAction={(checked) =>
                            handleChange(option.value, checked)
                        }
                    />

                ))}
            </div>

        </div>
    )
}