'use client'
import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react'
import s from './Recaptcha.module.scss'
import {SimpleRecaptcha} from "@/shared/ui/Recaptcha/SimpleRecaptcha/SimpleRecaptcha";

export type RecaptchaProps = {
  // Event handlers
  onVerify?: (token: string) => void
  // Optional className for styling
  className?: string
}

export const Recaptcha = forwardRef<{ getToken: () => string | null }, RecaptchaProps>(({
                                                                                          onVerify,
                                                                                          className = '',
                                                                                        }: RecaptchaProps, ref) => {

  const [isLoading, setIsLoading] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isExpired, setIsExpired] = useState(false)

  const simpleRecaptchaRef = useRef<{
    execute: () => void;
    reset: () => void;
    getToken: () => string | null;
  }>(null)

  // Экспортируем метод getToken через ref
  useImperativeHandle(ref, () => ({
    getToken: () => simpleRecaptchaRef.current?.getToken() || null
  }))

  const handleCheckboxChange = () => {
    if (isChecked || isLoading) return

    setIsLoading(true)
    setIsError(false)

    // Запускаем invisible reCAPTCHA
    simpleRecaptchaRef.current?.execute()
  }

  const handleVerify = (token: string) => {
    setIsChecked(true)
    setIsLoading(false)
    setIsError(false)
    setIsExpired(false)
    onVerify?.(token)
  }

  const handleExpired = () => {
    setIsChecked(false)
    setIsExpired(true)
    setIsError(false)
    setIsLoading(false)
  }

  const handleError = () => {
    setIsError(true)
    setIsLoading(false)
    simpleRecaptchaRef.current?.reset()
  }

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
              disabled={isLoading || isChecked}
              className={s.hiddenCheckbox}
            />
            {/* Custom checkbox with dynamic classes based on state */}
            <span
              className={`${s.recaptchaCheckbox} ${isChecked ? s.checked : ''} ${
                isLoading ? s.loading : ''
              } ${isError ? s.error : ''}`}
            >
              {/* Loading spinner */}
              {isLoading && <div className={s.spinner}></div>}
              {/* Checkmark icon when verified */}
              {isChecked && !isLoading && (
                <div className={s.checkmark}>
                  <svg width="25" height="19">
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
            <svg className={s.recaptchaLogo} width="30" height="31">
              <use xlinkHref="icons-sprite.svg#recaptchaLogo" />
            </svg>
          </div>
          <div className={s.recaptchaLogoText}>reCAPTCHA</div>
          {/* Privacy and Terms links */}
          <nav className={s.recaptchaLinks}>
            <a href="/privacy" onClick={e => e.preventDefault()}>
              Privacy
            </a>
            <span> - </span>
            <a href="/terms" onClick={e => e.preventDefault()}>
              Terms
            </a>
          </nav>
        </div>

        {/* Expired verification message */}
        {isExpired && (
          <p className={s.expiredText}>Verification expired. Check the checkbox again.</p>
        )}
      </div>
      {/* Error message displayed below the reCAPTCHA */}
      {isError && <p className={s.errorText}>Please verify that you are not a robot</p>}
      {/* Invisible reCAPTCHA */}
      {/* SimpleRecaptcha с invisible размером */}
      <SimpleRecaptcha
          ref={simpleRecaptchaRef}
          onVerify={handleVerify}
          onExpired={handleExpired}
          onError={handleError}
          size="invisible"
          theme="light"
      />
    </section>
  )
})

Recaptcha.displayName = 'Recaptcha'
