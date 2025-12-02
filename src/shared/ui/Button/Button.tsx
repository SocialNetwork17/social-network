import React, {ButtonHTMLAttributes} from 'react'
import type {ReactNode} from 'react'
import scss from './Button.module.scss'

import Image, {StaticImageData} from 'next/image'

type ButtonTheme = 'primary' | 'secondary' | 'outline' | 'textButton'

type ButtonProps = {
    children: ReactNode
    variant: ButtonTheme
    disabled: boolean
    onClickHandler?: () => void
    icon?: StaticImageData
    width?: string | number
    height?: string | number
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = (props: ButtonProps) => {
    const {
        children,
        variant,
        disabled,
        icon,
        width,
        height,
        onClickHandler,
        ...rest
    } = props

    const buttonClass = `${scss.button} ${scss[variant]}`

    const buttonStyle = {
        width: width,
        height: height,
    }

    return (
        <button
            className={buttonClass}
            style={buttonStyle}
            disabled={disabled}
            onClick={onClickHandler}
            {...rest}
        >
            {icon && <Image src={icon} alt={''} width={24} height={24}/>}
            {children}
        </button>
    )
}
