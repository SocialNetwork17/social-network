'use client'

import styles from './ForgotPasswordForm.module.scss'
import {Input} from '@/shared/ui/Input/Input'
import {Button} from '@/shared/ui/Button/Button'
import Link from 'next/link'
import {PATH} from '@/shared/constants/routings'
import {useRef, useState} from 'react'
import {RecaptchaNew} from '@/shared/ui/Recaptcha/RecaptchaNew'
import {useForm} from 'react-hook-form'
import {ForgotPasswordInput, forgotPasswordSchema,} from '@/features/forgotPassword/lib/forgotPasswordSchema'
import {zodResolver} from '@hookform/resolvers/zod'
import {SchemaRecaptchaErrorResponseDto} from '@/shared/api/schema'
import {isValid} from 'zod/v3'
import {Spinner} from '@/shared/ui/Spinner/Spinner'
import {useForgotPassword} from "@/features/forgotPassword/api/useForgotPassword";
import {useModal} from "@/widgets/modal/model/modal.context";
import {registrationConfirmModalAC} from "@/widgets/modal/model/modal.types";

// Тип для ref reCAPTCHA компонента
type RecaptchaRef = {
  getToken: () => Promise<string | null>
  reset: () => void
}

export const ForgotPasswordForm = () => {
  // Состояния компонента
  const [linkSent, setLinkSent] = useState(false)
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const {openModal} = useModal()


  // Инициализация формы с react-hook-form
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    mode: 'onBlur',
    resolver: zodResolver(forgotPasswordSchema),
  })

  // Кастомный хук для мутации восстановления пароля (React Query)
  const {
    mutate: forgotPassword,
    resetMutation,
    isPending, // Флаг выполнения запроса
  } = useForgotPassword()

  // Ref для доступа к методам reCAPTCHA компонента
  const recaptchaRef = useRef<RecaptchaRef>(null)

  // Обработчик повторной отправки ссылки
  const handleSendAgain = () => {
    setLinkSent(false)
    setRecaptchaToken(null)
    resetMutation()
  }

  // Основная функция обработки отправки формы
  const onSubmit = (data: ForgotPasswordInput) => {
    localStorage.setItem('recoveryEmail', data.email)
    // Проверяем наличие токена reCAPTCHA перед отправкой
    if (!recaptchaToken) {
      return
    }

    forgotPassword(
      {
        data: data, // Данные формы (email)
        recaptchaToken: recaptchaToken, // Токен reCAPTCHA для проверки на сервере
      },
      {
        // Обработка успешного ответа
        onSuccess: () => {
          openModal(registrationConfirmModalAC({
            title: "Email sent",
            email: data.email,
            description: "We have sent a link to confirm your email to "
          }))
          setLinkSent(true)
          setRecaptchaToken(null)

        },
        // Обработка ошибок
        onError: (error: SchemaRecaptchaErrorResponseDto | Error | string) => {
          // Всегда сбрасываем reCAPTCHA при любой ошибке
          setRecaptchaToken(null)

          // Проверяем структуру ошибки (ошибка API)
          if (typeof error === 'object' && 'statusCode' in error) {
            const apiError = error as SchemaRecaptchaErrorResponseDto

            // Обработка ошибки 400 (невалидные данные)
            if (apiError.statusCode === 400 && apiError.messages) {
              apiError.messages.forEach(errMsg => {
                // Если ошибка связана с email (пользователь не найден)
                if (errMsg.field === 'email') {
                  setError('email', {
                    type: 'manual',
                    message: "User with this email doesn't exist",
                  })
                }
              })
            }
          }
        },
      }
    )
  }

  return (
    <div className={styles.ForgotPasswordPage}>
      <h2 className={styles.title}>Forgot Password</h2>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('email')}
          errorText={errors.email?.message}
          error={!!errors.email}
          label={'Email'}
          type={'email'}
          placeholder={'Epam@epam.com'}
          required={false}
        />

        <p className={styles.text}>
          Enter your email address and we will send you further instructions
        </p>

        {!linkSent ? (
          <>
            <div className={styles.buttonContainer}>
              <Button
                variant={'primary'}
                disabled={!isValid || !recaptchaToken || !!errors.email || isPending}
                type={'submit'}
              >
                {isPending && <Spinner />} Send Link
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className={`${styles.text} ${styles.successText}`}>
              The link has been sent by email.
              <br />
              If you don’t receive an email send link again
            </p>
            <div className={styles.buttonContainer}>
              <Button
                variant={'primary'}
                disabled={false}
                type={'button'}
                onClick={handleSendAgain}
              >
                {isPending && <Spinner />} Send Link Again
              </Button>
            </div>
          </>
        )}
      </form>

      <div className={styles.linkContainer}>
        <Link href={PATH.SIGN_IN} className={styles.singInLink}>
          Back to Sign In
        </Link>
      </div>

      {!linkSent && (
        <div className={styles.recaptchaContainer}>
          <RecaptchaNew
            ref={recaptchaRef} // Ref для управления reCAPTCHA
            onVerify={(token: string) => {
              setRecaptchaToken(token) // Сохраняем токен при успешной верификации
            }}
            onError={() => {
              setRecaptchaToken(null) // Сбрасываем токен при ошибке
            }}
          />
        </div>
      )}
    </div>
  )
}
