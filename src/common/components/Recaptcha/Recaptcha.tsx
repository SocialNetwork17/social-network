import React from 'react'
import s from './Recaptcha.module.scss'

export const Recaptcha = () => {

    return (
        <div className={s.recaptchaWrapper}>
            <div className={`${s.recaptchaContainer}`}>
                {/* Чекбокс */}
                <div className={s.recaptchaCheckbox}>
                    <div className={s.checkboxInner}>
                        {s.isLoading && (
                            <div className={s.loadingSpinner}>
                                <div className={s.spinner}></div>
                            </div>
                        )}
                        {s.isChecked && !s.isLoading && (
                            <div className={s.checkmark}>✓</div>
                        )}
                    </div>
                </div>

                {/* Текст */}
                <div className={s.recaptchaText}>
                    <span>I&#39;m not a robot</span>
                </div>

                {/* Брендинг */}
                <div className={s.recaptchaBranding}>
                    <div className={s.recaptchaLogo}>reCAPTCHA</div>
                    <div className={s.recaptchaLinks}>
                        <span>Privacy</span>
                        <span> - </span>
                        <span>Terms</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
