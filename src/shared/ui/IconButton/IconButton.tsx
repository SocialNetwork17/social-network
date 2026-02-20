import { memo, MouseEventHandler } from 'react'
import styles from './IconButton.module.scss'
import { Icon } from '@/shared/ui/Icon/Icon'

type Props = {
  iconId: string | null
  onClick?: MouseEventHandler<HTMLButtonElement>
  size?: number
  viewBox?: string
  fill?: string
  disabled?: boolean
}

export const IconButton = memo((props: Props) => {
  const { iconId,
    size,
    viewBox,
    fill,
    disabled,
    onClick
  } = props

  return (
    <button
      className={`${styles.iconButton} ${disabled ? styles.iconButtonDisabled : ''}`}
      onClick={onClick}
      type="button"
      disabled={disabled}
    >
      <Icon iconId={iconId} size={size} viewBox={viewBox}/>
    </button>
  )
})
