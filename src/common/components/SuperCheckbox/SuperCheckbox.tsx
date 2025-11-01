import React, {
    ChangeEvent,
    DetailedHTMLProps,
    InputHTMLAttributes,
} from 'react'
import Image from 'next/image'
import s from './SuperCheckbox.module.scss'

// import SVG icons
import unselectedBox from '@/assets/icons/SuperCheckbox/svg/unselectedBox.svg'
import selectedBox from '@/assets/icons/SuperCheckbox/svg/selectedBox.svg'
import disabledUnselectedBox from '@/assets/icons/SuperCheckbox/svg/disabledUnselectedBox.svg'
import disabledSelectedBox from '@/assets/icons/SuperCheckbox/svg/disabledSelectedBox.svg'

// type of native input props
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement>

type SuperCheckboxPropsType = Omit<DefaultInputPropsType, 'type'> & {
    onChangeChecked?: (checked: boolean) => void
    spanClassName?: string
}

const SuperCheckbox = (
    {
        onChange,
        onChangeChecked,
        className,
        spanClassName,
        children,
        id,
        disabled,
        checked,
        ...restProps
    }: SuperCheckboxPropsType
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeChecked?.(e.currentTarget.checked)
        onChange?.(e)
    }

    const finalInputClassName = [
        s.checkbox,
        className
    ].filter(Boolean).join(' ')

    const finalSpanClassName = spanClassName || s.spanClassName

    // Function to get the corresponding icon
    const getCheckboxIcon = () => {
        if (disabled) {
            return checked ? disabledSelectedBox : disabledUnselectedBox
        }
        return checked ? selectedBox : unselectedBox
    }

    return (
        <label className={s.label} htmlFor={id}>
            <input
                id={id}
                type="checkbox"
                disabled={disabled}
                checked={checked}
                onChange={onChangeCallback}
                className={finalInputClassName}
                {...restProps}
            />
            {/* Custom checkbox icon */}
            <Image
                src={getCheckboxIcon()}
                alt="checkbox"
                className={s.customCheckbox}
                width={20}
                height={20}
            />
            {children && (
                <span
                    id={id ? `${id}-span` : undefined}
                    className={finalSpanClassName}
                >
                    {children}
                </span>
            )}
        </label>
    )
}

export default SuperCheckbox