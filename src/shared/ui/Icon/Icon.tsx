'use client'

import React from 'react'


type IconProps = {
  iconId: string
  size?: number
  viewBox?: string
  className?: string
}

export const Icon = ({ iconId, size = 24, viewBox = '0 0 24 24', className }: IconProps) => {
  const sprite = '/icons-sprite.svg'

  return (
    <svg width={size} height={size} viewBox={viewBox} className={className} fill={'currentColor'}>
      {/*viewBox добавить*/}
      <use xlinkHref={`${sprite}#${iconId}`} />
    </svg>
  )
}
