'use client'

import React from 'react'
import styles from './Header.module.scss'
import {HeaderMenu} from '@/widgets/header/ui/HeaderMenu/HeaderMenu'
import {useMeQuery} from '@/shared/api/useMeQuery'

export const Header = () => {

  const { data: user, isLoading } = useMeQuery()

  const isLoggedIn = !!user

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerWrapper}>
          <h1 className={styles.logo}>UnityGram</h1>

          {!isLoading && (
            <HeaderMenu
              isLoggedIn={isLoggedIn}
            />
          )}
        </div>
      </div>
    </header>
  )
}
