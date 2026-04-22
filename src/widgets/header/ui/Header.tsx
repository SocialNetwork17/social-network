'use client'

import React, { useState } from 'react'
import styles from './Header.module.scss'
import { HeaderMenu } from '@/widgets/header/ui/HeaderMenu/HeaderMenu'
import { useMeQuery } from '@/shared/api/useMeQuery'
import Link from "next/link";
import { PATH } from '@/shared/constants/routings'

export const Header = () => {

  const { data: user, isLoading } = useMeQuery()

  const isLoggedIn = !!user

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerWrapper}>
            <Link href={PATH.MAIN}>
                <h1 className={styles.logo}>UnityGram</h1>
            </Link>
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
