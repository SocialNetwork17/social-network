'use client'

import { KeyboardEvent, useState } from 'react'
import { Button } from '@/shared/ui/Button/Button'
import { Icon } from '@/shared/ui/Icon/Icon'
import styles from './MessageInput.module.scss'

type Props = {
  onSendMessage: (text: string) => Promise<boolean>
}

export const MessageInput = ({ onSendMessage }: Props) => {
  const [value, setValue] = useState('')

  const hasMessage = Boolean(value.trim())
  const isDisabled = !hasMessage

  const submitMessage = async () => {
    const wasSent = await onSendMessage(value)

    if (wasSent) {
      setValue('')
    }
  }

  const onKeyDown = async (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== 'Enter' || event.shiftKey) {
      return
    }

    event.preventDefault()

    if (isDisabled) {
      return
    }

    await submitMessage()
  }

  return (
    <div className={styles.container}>
      <textarea
        className={styles.textarea}
        onChange={event => setValue(event.currentTarget.value)}
        onKeyDown={onKeyDown}
        placeholder={'Type Message...'}
        rows={1}
        value={value}
      />
      {hasMessage ? (
        <Button variant={'textButton'} disabled={isDisabled} onClick={submitMessage} width={200}>
          Send message
        </Button>
      ) : (
        <div className={styles.actions}>
          <button className={styles.iconButton} type={'button'} aria-label={'Voice message'}>
            <Icon iconId={'mic-outline'} size={20} className={styles.iconSvg} />
          </button>
          <button className={styles.iconButton} type={'button'} aria-label={'Image upload'}>
            <Icon iconId={'image-outline'} size={20} className={styles.iconSvg} />
          </button>
        </div>
      )}
    </div>
  )
}
