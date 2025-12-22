'use client'
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

export type RecaptchaProps = {
  onVerify?: (token: string) => void
  className?: string
  siteKey?: string
  onError?: () => void
}

export const RecaptchaNew = forwardRef<
  {
    getToken: () => Promise<string | null>
    reset: () => void
  },
  RecaptchaProps
>(
  (
    {
      onVerify,
      className = '',
      siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
    }: RecaptchaProps,
    ref
  ) => {
    const recaptchaRef = useRef<ReCAPTCHA>(null)

    // Экспортируем методы через ref
    useImperativeHandle(ref, () => ({
      getToken: async () => {
        try {
          if (!recaptchaRef.current) {
            console.error('reCAPTCHA not loaded')
            return null
          }

          const token = await recaptchaRef.current.executeAsync()

          if (token) {
            onVerify?.(token)
          }

          return token
        } catch (error) {
          console.error('reCAPTCHA error:', error)
          return null
        }
      },
      reset: () => {
        if (recaptchaRef.current) {
          recaptchaRef.current.reset()
        }
      },
    }))

    const handleVerify = (token: string | null) => {
      if (token) {
        onVerify?.(token)
      }
    }

    // Проверяем наличие siteKey
    if (!siteKey) {
      console.error('reCAPTCHA site key is missing')
      return
    }

    return (
      <div className={className}>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={siteKey}
          onChange={handleVerify}
          size="normal"
          hl="en"
          theme="dark"
        />
      </div>
    )
  }
)

RecaptchaNew.displayName = 'Recaptcha'
