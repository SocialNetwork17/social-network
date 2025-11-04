import React, { useState } from 'react'
import s from './Recaptcha.module.scss'
import recaptchaLogo from '../../../assets/icons/Recaptcha/recaptchaLogo.svg'
import checkmarkIcon from '../../../assets/icons/Recaptcha/checkmark.svg'
import Image from 'next/image'

export const Recaptcha = () => {
    // State management for different reCAPTCHA statuses
    const [isLoading, setIsLoading] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isExpired, setIsExpired] = useState(false)

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Prevent interaction during loading or when already checked
        if (isLoading || isChecked) {
            event.preventDefault()
            return
        }

        // Reset states and start loading
        setIsLoading(true)
        setIsError(false)
        setIsExpired(false)

        // Simulate API call with random outcomes for testing
        const shouldFail = Math.random() < 0.3
        const shouldExpired = Math.random() < 0.3

        setTimeout(() => {
            setIsLoading(false)
            if (shouldFail) {
                setIsError(true)
                console.log('Ошибка reCAPTCHA!')
            } else if (shouldExpired) {
                setIsExpired(true)
                console.log('Ошибка reCAPTCHA Expired!')
            } else {
                setIsChecked(true)
                console.log('reCAPTCHA пройдена!')
            }
        }, 1500)
    }

    // Reset all states to initial values
    const handleReset = () => {
        setIsChecked(false)
        setIsLoading(false)
        setIsError(false)
        setIsExpired(false)
    }

    return (
        <section className={`${s.recaptchaWrapper} ${isError ? s.error : ''}`}>
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
                                <Image
                                    src={checkmarkIcon}
                                    alt="Verified"
                                    width={25}
                                    height={19}
                                    className={s.checkmark}
                                />
                            )}
                        </span>
                    </label>

                    <div className={s.recaptchaText}>
                        <span>I&#39;m not a robot</span>
                    </div>
                </div>

                {/* reCAPTCHA branding section */}
                <div className={s.recaptchaBranding}>
                    <Image
                        className={s.recaptchaImage}
                        src={recaptchaLogo}
                        alt="reCAPTCHA"
                        width={30}
                        height={31}
                    />
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

                {/* Reset button shown when checked or in error state */}
                {(isChecked || isError) && (
                    <div className={s.resetButton} onClick={handleReset}>
                        {isError ? 'Try again' : 'Сбросить'}
                    </div>
                )}

                {/* Expired verification message */}
                {isExpired && (
                    <p className={s.expiredText}>
                        Verification expired. Check the checkbox again.
                    </p>
                )}
            </div>
            {/* Error message displayed below the reCAPTCHA */}
            {isError && <p className={s.errorText}>Please verify that you are not a robot</p>}
        </section >
    )
}