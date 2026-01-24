'use client'

import React, { useState } from 'react'
import styles from './Header.module.scss'
import { HeaderMenu } from '@/widgets/header/ui/HeaderMenu/HeaderMenu'
import { useMeQuery } from '@/shared/api/useMeQuery'
import Link from "next/link";
import { PATH } from '@/shared/constants/routings'


export const Header = () => {
  const [countNotices, setCountNotices] = useState<number>(0)

  const { data: user, isLoading } = useMeQuery() // ➕

  const onClickHandler = () => {
    setCountNotices(countNotices + 1)
  }

  const isLoggedIn = !!user // ➕ тру

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerWrapper}>
          <Link href={PATH.MAIN}>
            <h1 className={styles.logo}>Inctagram</h1>
          </Link>
          {!isLoading && (
            <HeaderMenu
              countMessage={countNotices}
              isLoggedIn={isLoggedIn} // ➕
              onClickHandler={onClickHandler}
            />
          )}
        </div>
      </div>
    </header>
  )
}
