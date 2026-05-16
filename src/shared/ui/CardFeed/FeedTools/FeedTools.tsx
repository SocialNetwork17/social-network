'use client'

import styles from './FeedTools.module.scss'
import { useState } from 'react'
import { IconButton } from '../../IconButton/IconButton'


export const FeedTools = () => {
  const [isChecked, setIsChecked] = useState(false)

  const toggleMenu = () => {
    setIsChecked(!isChecked)
  }

  return (
      <div className={styles.flex}>
        <div className={styles.icons}>
          <IconButton onClick={toggleMenu} iconId="like" size={24} viewBox="0 0 24 24" />
          <IconButton onClick={toggleMenu} iconId="messenger" size={24} viewBox="0 0 24 24" />
          <IconButton onClick={toggleMenu} iconId="send" size={24} viewBox="0 0 24 24" />
        </div>
        <IconButton onClick={toggleMenu} iconId="favorites" size={24} viewBox="0 0 24 24" />
      </div>
  )
}
