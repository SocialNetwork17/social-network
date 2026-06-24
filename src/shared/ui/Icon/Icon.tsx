import React from 'react'

type IconProps = {
  iconId: string | null
  size?: number
  viewBox?: string
  className?: string
  fill?: string
  stroke?: string
}

export const Icon = (props: IconProps) => {
  const sprite = '/icons-sprite.svg'
  const { iconId, size, className, fill, stroke, viewBox } = props

  return (
    <svg
      width={size || 24}
      height={size || 24}
      viewBox={viewBox || '0 0 24 24'}
      stroke={stroke || 'none'}
      className={className}
      style={{ color: fill || 'currentColor' }}
    >
      <use xlinkHref={`${sprite}#${iconId}`} />
    </svg>
  )
}
