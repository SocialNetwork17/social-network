'use client'
import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect, useCallback } from 'react'
import s from './Recaptcha.module.scss'
import ReCAPTCHA from "react-google-recaptcha";

export type RecaptchaProps = {
  onVerify?: (token: string) => void
  className?: string
  siteKey?: string
}

export const RecaptchaNew = forwardRef<{
  getToken: () => Promise<string | null>;
  reset: () => void
}, RecaptchaProps>(({
                      onVerify,
                      className = '',
                      siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!
                    }: RecaptchaProps, ref) => {

  const [isLoading, setIsLoading] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isExpired, setIsExpired] = useState(false)
  const [currentToken, setCurrentToken] = useState<string | null>(null)

  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const mountedRef = useRef(true)

  // Сброс состояния
  const resetState = useCallback(() => {
    setCurrentToken(null)
    setIsChecked(false)
    setIsLoading(false)
    setIsError(false)
    setIsExpired(false)
  }, [])

  // Сброс reCAPTCHA
  const resetRecaptcha = useCallback(() => {
    resetState()
    if (recaptchaRef.current) {
      recaptchaRef.current.reset()
    }
  }, [resetState])

  // Экспортируем методы через ref
  useImperativeHandle(ref, () => ({
    getToken: async () => {
      if (currentToken) {
        return currentToken
      }

      // Если токен не существует, выполняем reCAPTCHA
      setIsLoading(true)
      setIsError(false)
      setIsExpired(false)

      try {
        if (!recaptchaRef.current) {
          throw new Error('reCAPTCHA not loaded')
        }

        const token = await recaptchaRef.current.executeAsync()

        if (!mountedRef.current) return null

        if (token) {
          setCurrentToken(token)
          setIsChecked(true)
          setIsLoading(false)
          setIsError(false)
          setIsExpired(false)
          onVerify?.(token)
          return token
        } else {
          setIsError(true)
          setIsLoading(false)
          return null
        }
      } catch (error) {
        if (!mountedRef.current) return null

        setIsError(true)
        setIsLoading(false)
        return null
      }
    },
    reset: resetRecaptcha
  }))

  const handleCheckboxChange = useCallback(() => {
    if (isChecked || isLoading) return

    setIsLoading(true)
    setIsError(false)
    setIsExpired(false)

    // Запускаем invisible reCAPTCHA через executeAsync
    const executeRecaptcha = async () => {
      try {
        if (!recaptchaRef.current) {
          throw new Error('reCAPTCHA not loaded')
        }

        const token = await recaptchaRef.current.executeAsync()

        if (!mountedRef.current) return

        if (token) {
          setCurrentToken(token)
          setIsChecked(true)
          setIsLoading(false)
          setIsError(false)
          setIsExpired(false)
          onVerify?.(token)
        } else {
          setIsError(true)
          setIsLoading(false)
        }
      } catch (error) {
        if (!mountedRef.current) return

        setIsError(true)
        setIsLoading(false)
      }
    }

    executeRecaptcha()
  }, [isChecked, isLoading, onVerify])

  const handleVerify = useCallback((token: string) => {
    if (!mountedRef.current) return

    setCurrentToken(token)
    setIsChecked(true)
    setIsLoading(false)
    setIsError(false)
    setIsExpired(false)
    onVerify?.(token)
  }, [onVerify])

  const handleExpired = useCallback(() => {
    if (!mountedRef.current) return

    resetState()
    setIsExpired(true)

    // Сбрасываем reCAPTCHA
    if (recaptchaRef.current) {
      recaptchaRef.current.reset()
    }
  }, [resetState])

  const handleError = useCallback(() => {
    if (!mountedRef.current) return

    resetState()
    setIsError(true)
  }, [resetState])

  const handleRecaptchaChange = useCallback((token: string | null) => {
    if (!mountedRef.current) return

    if (token) {
      handleVerify(token)
    } else {
      // Если токен null, это может быть сброс
      resetState()
    }
  }, [handleVerify, resetState])

  // Очищаем токен при размонтировании
  useEffect(() => {
    mountedRef.current = true

    return () => {
      mountedRef.current = false
      if (recaptchaRef.current) {
        recaptchaRef.current.reset()
      }
    }
  }, [])

  // Проверяем наличие siteKey
  useEffect(() => {
    if (!siteKey) {
      console.error('reCAPTCHA site key is missing')
      setIsError(true)
    }
  }, [siteKey])

  return (
      <section className={`${s.recaptchaWrapper} ${isError ? s.error : ''} ${className}`}>
        <div className={s.recaptchaContainer}>
          <div className={s.recaptchaContent}>
            {/* Checkbox label with custom styling */}
            <label className={s.checkboxLabel}>
              <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  disabled={isLoading || isChecked || !siteKey}
                  className={s.hiddenCheckbox}
                  aria-label="Verify you are not a robot"
                  aria-checked={isChecked}
                  aria-busy={isLoading}
              />
              {/* Custom checkbox with dynamic classes based on state */}
              <span
                  className={`${s.recaptchaCheckbox} ${isChecked ? s.checked : ''} ${
                      isLoading ? s.loading : ''
                  } ${isError ? s.error : ''} ${!siteKey ? s.disabled : ''}`}
                  aria-hidden="true"
              >
              {/* Loading spinner */}
                {isLoading && <div className={s.spinner} role="status" aria-label="Loading"></div>}
                {/* Checkmark icon when verified */}
                {isChecked && !isLoading && (
                    <div className={s.checkmark}>
                      <svg width="25" height="19" aria-hidden="true">
                        <use xlinkHref="icons-sprite.svg#checkmark" />
                      </svg>
                    </div>
                )}
            </span>
            </label>

            <div className={s.recaptchaText}>
              <span>I&#39;m not a robot</span>
            </div>
          </div>

          {/* reCAPTCHA branding section */}
          <div className={s.recaptchaBranding}>
            <div className={s.recaptchaImage}>
              <svg className={s.recaptchaLogo} width="30" height="31" aria-hidden="true">
                <use xlinkHref="icons-sprite.svg#recaptchaLogo" />
              </svg>
            </div>
            <div className={s.recaptchaLogoText}>reCAPTCHA</div>
            {/* Privacy and Terms links */}
            <nav className={s.recaptchaLinks} aria-label="reCAPTCHA links">
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                Privacy
              </a>
              <span> - </span>
              <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">
                Terms
              </a>
            </nav>
          </div>

          {/* Expired verification message */}
          {isExpired && (
              <p className={s.expiredText} role="alert">
                Verification expired. Check the checkbox again.
              </p>
          )}
        </div>

        {/* Error message displayed below the reCAPTCHA */}
        {isError && (
            <p className={s.errorText} role="alert">
              {!siteKey
                  ? 'reCAPTCHA configuration error. Please contact support.'
                  : 'Please verify that you are not a robot'
              }
            </p>
        )}

        {/* Invisible reCAPTCHA */}
        {siteKey && (
            <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={siteKey}
                onChange={handleRecaptchaChange}
                onExpired={handleExpired}
                onErrored={handleError}
                size="normal"
                theme="dark"
                hl="en"
            />
        )}
      </section>
  )
})

RecaptchaNew.displayName = 'Recaptcha'