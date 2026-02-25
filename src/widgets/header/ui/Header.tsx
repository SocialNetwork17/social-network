'use client'

import React, { useState } from 'react'
import styles from './Header.module.scss'
import { HeaderMenu } from '@/widgets/header/ui/HeaderMenu/HeaderMenu'
import { useMeQuery } from '@/shared/api/useMeQuery'

export const Header = () => {
  const [countNotices, setCountNotices] = useState<number>(0)

  const { data: user, isLoading } = useMeQuery()

  const onClickHandler = () => {
    setCountNotices(countNotices + 1)
  }

  const isLoggedIn = !!user

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerWrapper}>
          <h1 className={styles.logo}>Inctagram</h1>

          {!isLoading && (
            <HeaderMenu
              countMessage={countNotices}
              isLoggedIn={isLoggedIn}
              onClickHandler={onClickHandler}
            />
          )}
        </div>
      </div>
    </header>
  )
}
