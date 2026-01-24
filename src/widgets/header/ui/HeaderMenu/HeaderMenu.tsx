import React from 'react'
import styles from './HeaderMenu.module.scss'
import SelectBox, { Option } from '@/shared/ui/select-box/SelectBox'
import { IconButton } from '@/shared/ui/IconButton/IconButton'
import { Button } from '@/shared/ui/Button/Button'
import Link from 'next/link'
import { PATH } from '@/shared/constants/routings'
import {ThemeSwitcher} from "@/shared/ui/ThemeSwitcher/ThemeSwitcher";

type HeaderMenu = {
  isLoggedIn: boolean
  countMessage: number
  onClickHandler: () => void
}

export const HeaderMenu = (props: HeaderMenu) => {
  const { isLoggedIn, countMessage, onClickHandler } = props

  const languages = [
    { id: '1', label: 'Russian', countryCode: 'RU' },
    { id: '2', label: 'English', countryCode: 'GB' },
    { id: '3', label: 'Canadian', countryCode: 'CA' },
  ]

  const handleSelect = (option: Option) => {
    console.log('Selected:', option)
  }

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
            onChange={handleSelect}
            defaultValue={languages[1]} // GB will be pre-selected
          />
        </>
      ) : (
        <>
          <SelectBox
            options={languages}
            onChange={handleSelect}
            defaultValue={languages[1]} // GB will be pre-selected
          />
          <div className={`${styles.buttonsBox}`}>
            <Link href={PATH.SIGN_IN}>
              <Button variant={'textButton'} disabled={false} width={100} height={36}>
                Log in
              </Button>
            </Link>
            <Link href={PATH.SIGN_UP}>
              <Button variant={'primary'} disabled={false} width={100} height={36}>
                Sign up
              </Button>
            </Link>
            <ThemeSwitcher/>
          </div>
        </>
      )}
    </div>
  )
}
