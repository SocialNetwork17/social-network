import React from 'react'

type IconProps = {
  iconId: string
  size?: number
  viewBox?: string
  className?: string
    fill?: string
    stroke?: string
}

export const Icon = (props: IconProps) => {
  const sprite = '/icons-sprite.svg'

  return (
    <svg
        width={props.size || 24}
        height={props.size || 24}
        viewBox={props.viewBox || '0 0 24 24'}
        fill={props.fill || 'currentColor'}
        stroke={props.stroke || "none"}
        className={props.className}
    >
      {/*viewBox добавить*/}
      <use xlinkHref={`${sprite}#${props.iconId}`} />
    </svg>
  )
}
