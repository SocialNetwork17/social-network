'use client'

import styles from './CreateNewPasswordForm.module.scss'
import { Input } from '@/shared/ui/Input/Input'
import { Button } from '@/shared/ui/Button/Button'
import { useCreateNewPassword } from '../model/useCreateNewPassword'
import { useForm } from 'react-hook-form'
import {
  NewPasswordFormData,
  newPasswordSchema,
} from '@/features/createNewPassword/lib/createNewPasswordSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { PATH } from '@/shared/constants/routings'
import { useSearchParams, useRouter } from 'next/navigation'
import { Spinner } from '@/shared/ui/Spinner/Spinner'

export const CreateNewPasswordForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<NewPasswordFormData>({
    resolver: zodResolver(newPasswordSchema), // Интеграция Zod для валидации
    mode: 'onChange', // Валидация при каждом изменении
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  })

  const recoveryCode = searchParams ? searchParams.get('code') : null

  const { mutate: createNewPassword, isPending } = useCreateNewPassword()

  const onSubmit = (data: NewPasswordFormData) => {
    if (!recoveryCode) return

    createNewPassword(
      {
        newPassword: data.newPassword,
        recoveryCode: recoveryCode,
      },
      {
        onSuccess: () => {
          reset()
          router.push(PATH.SIGN_IN)
        },
        onError: () => {
          router.push(PATH.LINK_EXPIRED_RECOVERY_CODE)
        },
      }
    )
  }

  // проверка возможности отправки формы
  const canSubmit = !isPending && !isSubmitting && isValid && !!recoveryCode

  return (
    <div className={styles.CreateNewPasswordPage}>
      <h2 className={styles.title}>Create New Password</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputsWrapper}>
          {/* Поле для нового пароля с валидацией */}
          <Input
            {...register('newPassword')} // Регистрация поля в react-hook-form
            errorText={errors.newPassword?.message}
            error={!!errors.newPassword}
            label={'New password'}
            type={'password'}
            placeholder={'******************'}
            required={false}
            disabled={isPending || isSubmitting} // Блокировка во время отправки
          />
          {/* Поле подтверждения пароля */}
          <Input
            {...register('confirmPassword')}
            errorText={errors.confirmPassword?.message}
            error={!!errors.confirmPassword}
            label={'Password confirmation'}
            type={'password'}
            placeholder={'******************'}
            required={false}
            disabled={isPending || isSubmitting}
          />
        </div>
        <p className={styles.text}>Your password must be between 6 and 20 characters</p>

        {/* Кнопка отправки формы с контролем состояния */}
        <Button variant={'primary'} type="submit" disabled={!canSubmit}>
          {isPending && <Spinner />} Create new password
        </Button>
      </form>
    </div>
  )
}
