import React, { useState } from 'react'
import styles from './HeaderMenu.module.scss'
import SelectBox from '@/shared/ui/select-box/SelectBox'
import { IconButton } from '@/shared/ui/IconButton/IconButton'
import { Button } from '@/shared/ui/Button/Button'
import Link from "next/link";
import {PATH} from "@/shared/constants/routings";

type HeaderMenu = {
  isLoggedIn: boolean
  countMessage: number
  onClickHandler: () => void
}

export const HeaderMenu = (props: HeaderMenu) => {
  const [languageValue, setLanguageValue] = useState<string>('1')

  const { isLoggedIn, countMessage, onClickHandler } = props

  const languages = [
    { id: '1', label: 'Russian' },
    { id: '2', label: 'English' },
  ]

  return (
    <div className={`${styles.menuBox}`}>
      {isLoggedIn ? (
        <>
          <div className={styles.iconBox}>
            <IconButton
              onClick={onClickHandler}
              iconId={'messageBell'}
              size={20}
              viewBox={'0 0 18 20'}
              fill={'white'}
            />
            {!!countMessage && <p className={styles.counterMessage}>{countMessage}</p>}
          </div>
          <SelectBox
            options={languages}
            value={languageValue}
            onChange={option => {
              setLanguageValue(option.id)
            }}
          />
        </>
      ) : (
        <>
          <SelectBox
            options={languages}
            value={languageValue}
            onChange={option => {
              setLanguageValue(option.id)
            }}
          />
          <div className={`${styles.buttonsBox}`}>
            {/*// замена на линки*/}

            {/*<Link*/}
            {/*    href={PATH.SIGN_IN}*/}
            {/*    >*/}
            {/*  Log in*/}
            {/*</Link>*/}
            {/*<Link*/}
            {/*    href={PATH.SIGN_UP}*/}
            {/*    >*/}
            {/*  Sing up*/}
            {/*</Link>*/}

            <Button variant={'textButton'} disabled={false} width={100} height={36}>
              Log in
            </Button>
            <Button variant={'primary'} disabled={false} width={100} height={36}>
              Sing up
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
