'use client'
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

export type SimpleRecaptchaProps = {
  onVerify?: (token: string) => void
  onExpired?: () => void
  onError?: () => void
  size?: 'normal' | 'compact' | 'invisible'
  theme?: 'light' | 'dark'
  language?: string
}

export const SimpleRecaptcha = forwardRef<
  { execute: () => void; reset: () => void; getToken: () => string | null },
  SimpleRecaptchaProps
>(({ onVerify, onExpired, onError, size = 'invisible', theme = 'light', language = 'en' }, ref) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useImperativeHandle(ref, () => ({
    execute: () => {
      if (!isLoaded) {
        console.error('ReCAPTCHA еще не загружен')
        return
      }
      recaptchaRef.current?.execute()
    },
    reset: () => {
      if (!isLoaded) {
        console.error('ReCAPTCHA еще не загружен')
        return
      }
      recaptchaRef.current?.reset()
      setToken(null)
    },
    getToken: () => token,
  }))

  const onChange = (token: string | null) => {
    setToken(token)
    if (token && onVerify) {
      onVerify(token)
    } else if (!token && onExpired) {
      onExpired()
    }
  }

  return (
    <ReCAPTCHA
      ref={recaptchaRef}
      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
      onChange={onChange}
      onExpired={onExpired}
      onErrored={onError}
      size={size}
      theme={theme}
      hl={language}
      asyncScriptOnLoad={() => setIsLoaded(true)}
    />
  )
})

SimpleRecaptcha.displayName = 'SimpleRecaptcha'
