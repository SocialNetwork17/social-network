import React from 'react'
import styles from './HeaderMenu.module.scss'
import SelectBox, {BaseOption} from '@/shared/ui/select-box/SelectBox'
import {Button} from '@/shared/ui/Button/Button'
import Link from 'next/link'
import {PATH} from '@/shared/constants/routings'
import {NotificationBell} from "@/features/notifications/ui/NotificationBell/NotificationBell";

type HeaderMenu = {
  isLoggedIn: boolean

}

export const HeaderMenu = (props: HeaderMenu) => {
  const { isLoggedIn } = props

  const languages = [
    { id: '1', label: 'Russian', countryCode: 'RU' },
    { id: '2', label: 'English', countryCode: 'GB' },
    { id: '3', label: 'Canadian', countryCode: 'CA' },
  ]

  const handleSelect = (option: BaseOption) => {
    console.log('Selected:', option)
  }

  return (
    <div className={`${styles.menuBox}`}>
      {isLoggedIn ? (
        <>
          <NotificationBell/>
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
          </div>
        </>
      )}
    </div>
  )
}
