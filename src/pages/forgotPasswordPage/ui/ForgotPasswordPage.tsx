'use client'

import styles from './ForgotPasswordPage.module.scss'
import {Input} from "@/shared/ui/Input/Input";
import {Button} from "@/shared/ui/Button/Button";
import Link from "next/link";
import {PATH} from "@/shared/constants/routings";
import { useRef } from "react";
import {RecaptchaNew} from "@/shared/ui/Recaptcha/RecaptchaNew";
import {Modal} from "@/shared/ui/Modal/Modal";
import {useForgotPassword} from "@/pages/forgotPasswordPage/model/useForgotPassword";

// Тип для ref reCAPTCHA
type RecaptchaRef = {
    getToken: () => Promise<string | null>
    reset: () => void
}

export const ForgotPasswordPage = () => {
    const {
        linkSent,
        isModalOpen,
        userEmail,
        errors,
        isPending,
        isButtonDisabled,
        handleSubmit,
        register,
        onSubmit,
        handleSendAgain,
        handleModalClose,
        handleEmailChange,
        handleRecaptchaVerify,
        handleRecaptchaError,
    } = useForgotPassword();

    const recaptchaRef = useRef<RecaptchaRef>(null);

    return (
        <div className={styles.ForgotPasswordPage}>
            <h2 className={styles.title}>Forgot Password</h2>

            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <Input {...register('email', {
                    required: 'Email is required',
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                    }
                })}
                       errorText={errors.email?.message}
                       error={!!errors.email}
                       label={'Email'}
                       type={'email'}
                       placeholder={'Epam@epam.com'}
                       required={false}
                       onChange={(e) => {
                           // Обновляем email в state при изменении
                           handleEmailChange(e.target.value);
                       }}
                />
                <p className={styles.text}>
                    Enter your email address and we will send you further instructions
                </p>
                {!linkSent ?
                    (<>
                        <div className={styles.buttonContainer}>
                            <Button
                                variant={'primary'}
                                disabled={isButtonDisabled || isPending}
                                type={"submit"}
                            >
                                {isPending ? 'Sending...' : 'Send Link'}
                            </Button>
                        </div>
                    </>) :
                    (<>
                        <p className={`${styles.text} ${styles.successText}`}>
                            The link has been sent by email.<br/>
                            If you don’t receive an email send link again</p>
                        <div className={styles.buttonContainer}>
                            <Button
                                variant={'primary'}
                                disabled={false}
                                type={"button"}
                                onClick={handleSendAgain}
                            >
                               Send Link Again
                            </Button>
                        </div>

                    </>)
                }
            </form>
            <div className={styles.linkContainer}>
                <Link href={PATH.SIGN_IN} className={styles.singInLink}>
                    Back to Sign In
                </Link>
            </div>
            {!linkSent &&
                <div className={styles.recaptchaContainer}>
                    <RecaptchaNew
                        onVerify={handleRecaptchaVerify}
                        ref={recaptchaRef}
                        onError={handleRecaptchaError}
                    />
                </div>
            }
            <Modal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                title={'Email sent'}
            >
                <div className={styles.modalContant}>
                    <p className={styles.modalText}>We have sent a link to confirm your email to {userEmail}</p>
                    <div className={styles.modalButton} >
                        <Button variant={"primary"} disabled={false} onClick={handleModalClose}>
                            <p className={styles.modalButtonText} >OK</p>
                        </Button>
                    </div>
                </div>
            </Modal>

        </div>
    )
}