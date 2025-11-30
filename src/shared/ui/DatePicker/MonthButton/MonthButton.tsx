// MonthButton.tsx
import styles from './MonthButton.module.scss'
import { ButtonHTMLAttributes } from 'react'
import { Icon } from '@/shared/ui/Icon/Icon'

export type IconIdType = 'arrow-ios-back' | 'arrow-ios-forward' | 'calendar' | string

export type MonthButtonProps = {
    iconId: IconIdType
} & ButtonHTMLAttributes<HTMLButtonElement>

export const MonthButton = ({ iconId, ...restProps }: MonthButtonProps) => {
    return (
        <button {...restProps} className={styles.monthButton}>
            <div className={styles.iconWrapper}>
                <Icon iconId={iconId} size={20} className={styles.icon} />
            </div>
        </button>
    )
}