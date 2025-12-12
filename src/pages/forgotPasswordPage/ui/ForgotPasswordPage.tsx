'use client'

import styles from './ForgotPasswordPage.module.scss'
import {Input} from "@/shared/ui/Input/Input";
import {Button} from "@/shared/ui/Button/Button";
import Link from "next/link";
import {PATH} from "@/shared/constants/routings";
import {useRef, useState} from "react";
import {useMutation } from '@tanstack/react-query';
import {client} from "@/shared/api/client";
import {useForm} from "react-hook-form";
import {SchemaPasswordRecoveryInputDto, SchemaRecaptchaErrorResponseDto} from "@/shared/api/schema";
import {RecaptchaNew} from "@/shared/ui/Recaptcha/RecaptchaNew";
import {Modal} from "@/shared/ui/Modal/Modal";

// Тип для ref reCAPTCHA
type RecaptchaRef = {
    getToken: () => Promise<string | null>
    reset: () => void
}

export const ForgotPasswordPage = () => {
    const [linkSent, setLinkSent] = useState(false);
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
    const [emailError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [userEmail, setUserEmail] = useState<string>('');

    // Используем правильный тип для ref
    const recaptchaRef = useRef<RecaptchaRef>(null)

    const {
        handleSubmit,
        register,
        formState: { errors },
        setError,
        clearErrors
    } = useForm<SchemaPasswordRecoveryInputDto>()

    const {mutate, reset: resetMutation} = useMutation({

        mutationFn: async (data: SchemaPasswordRecoveryInputDto) => {

            if (!recaptchaToken) {
                throw new Error('reCAPTCHA verification required');
            }

            const response = await client.POST('/api/v1/auth/password-recovery', {
                body: {
                    email: data.email,
                    baseUrl: "http://localhost:3000/createNewPassword",
                    recaptcha: recaptchaToken
                }
            })
            if (response.error) {
                // Бросаем ошибку с полной структурой ответа
                throw response.error;
            }
            return response.data
        },
        onSuccess: () => {
            setIsModalOpen(true);
            setLinkSent(true);
            setRecaptchaToken(null);
        },
        onError: (error: SchemaRecaptchaErrorResponseDto | Error | string) => {
            console.error('Recovery error:', error);

            if (typeof error === 'object' && 'statusCode' in error) {
                const apiError = error;

                if (apiError.statusCode === 400 && apiError.messages) {
                    apiError.messages.forEach((errMsg) => {
                        if (errMsg.field === 'email') {
                            // Просто устанавливаем ошибку без очистки
                            setError('email', {
                                type: 'manual',
                                message: 'User with this email doesn\'t exist'
                            });
                        }
                    });
                }
            }
            // Сброс reCAPTCHA
            setRecaptchaToken(null);
            if (recaptchaRef.current?.reset) {
                recaptchaRef.current.reset();
            }
        },
    })

    const handleRecaptchaVerify = (token: string) => {
        setRecaptchaToken(token)
    }


    const onSubmit = (data: SchemaPasswordRecoveryInputDto) => {
        clearErrors(); // Очищаем все ошибки react-hook-form

        // Валидация reCAPTCHA
        if (!recaptchaToken) {
            return;
        }
        mutate(data);
    }

    const handleSendAgain = () => {
        setLinkSent(false)
        setRecaptchaToken(null)
        clearErrors()

        // Сбрасываем mutation состояние
        resetMutation()

        // Сбрасываем reCAPTCHA
        if (recaptchaRef.current?.reset) {
            recaptchaRef.current.reset()
        }
    }

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
                       errorText={emailError || errors.email?.message} // Используем state ошибку
                       error={!!emailError || !!errors.email}
                       label={'Email'}
                       type={'email'}
                       placeholder={'Epam@epam.com'}
                       required={false}
                       onChange={(e) => {
                           // Обновляем email в state при изменении
                           setUserEmail(e.target.value);
                       }}
                />
                <p className={styles.text}>Enter your email address and we will send you further instructions </p>
                {!linkSent ?
                    (<>
                        <div className={styles.buttonContainer}>
                            <Button variant={'primary'} disabled={false} type={"submit"}>
                                Send Link
                            </Button>
                        </div>
                    </>) :
                    (<>
                        <p className={`${styles.text} ${styles.successText}`}>
                            The link has been sent by email.<br/>
                            If you don’t receive an email send link again</p>
                        <div className={styles.buttonContainer}>
                            <Button variant={'primary'} disabled={false} type={"submit"} onClick={handleSendAgain}>
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
                    <RecaptchaNew  onVerify={handleRecaptchaVerify} ref={recaptchaRef}/>
                </div>
            }
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={'Email sent'}>
                <div className={styles.modalContant}>
                    <p className={styles.modalText}>We have sent a link to confirm your email to {userEmail}</p>
                    <div className={styles.modalButton} >
                        <Button variant={"primary"} disabled={false}>
                            <p className={styles.modalButtonText} onClick={() => setIsModalOpen(false)}>OK</p>
                        </Button>
                    </div>
                </div>
            </Modal>

        </div>
    )
}