'use client'
import React from 'react'
import s from './Recaptcha.module.scss'

export type RecaptchaProps = {
    // State values
    isLoading?: boolean
    isChecked?: boolean
    isError?: boolean
    isExpired?: boolean
    // Event handlers - use Action suffix for Server Actions
    onCheckboxChangeAction?: (event: React.ChangeEvent<HTMLInputElement>) => void
    // Optional className for styling
    className?: string
}

export const Recaptcha = ({
                              isLoading = false,
                              isChecked = false,
                              isError = false,
                              isExpired = false,
                              onCheckboxChangeAction,
                              className = ''
                          }: RecaptchaProps) => {
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // If external handler is provided, call it
        if (onCheckboxChangeAction) {
            onCheckboxChangeAction(event)
            return
        }

        // Otherwise use default behavior (for demonstration)
        // Prevent interaction during loading or when already checked
        if (isLoading || isChecked) {
            event.preventDefault()
            return
        }

        console.log('reCAPTCHA clicked - implement your own logic in onCheckboxChangeAction prop')
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
                        <span className={`${s.recaptchaCheckbox} ${isChecked ? s.checked : ''} ${isLoading ? s.loading : ''} ${isError ? s.error : ''}`}>
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
                        <a href="/privacy" onClick={(e) => e.preventDefault()}>
                            Privacy
                        </a>
                        <span> - </span>
                        <a href="/terms" onClick={(e) => e.preventDefault()}>
                            Terms
                        </a>
                    </nav>
                </div>

                {/* Expired verification message */}
                {isExpired && (
                    <p className={s.expiredText}>
                        Verification expired. Check the checkbox again.
                    </p>
                )}
            </div>
            {/* Error message displayed below the reCAPTCHA */}
            {isError && <p className={s.errorText}>Please verify that you are not a robot</p>}
        </section>
    )
}