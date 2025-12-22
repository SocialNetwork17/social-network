'use client'
import styles from './LinkExpiredPage.module.scss'
import { Input } from '@/shared/ui/Input/Input'
import {
  resendEmailSchema,
  ResendEmailType,
} from '@/pages/auth/linkExpiredPage/lib/linkExpiredSchema'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/shared/ui/Button/Button'
import confirmCodeImg from '../../../../../public/registrationCodeExpired.svg'
import Image from 'next/image'
import { Modal } from '@/shared/ui/Modal/Modal'
import { useState } from 'react'
import { Spinner } from '@/shared/ui/Spinner/Spinner'
import { useResendRegistrationCode } from '@/pages/auth/linkExpiredPage/api/useResendRegistrationCode'
import { ErrorWithMessageResponse } from '@/shared/types/types'

export const LinkExpiredPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    reset: resetForm,
    formState: { errors },
  } = useForm<ResendEmailType>({
    resolver: zodResolver(resendEmailSchema),
    mode: 'all',
    defaultValues: {
      email: '',
    },
  })

  const {
    mutate: resendRegistrationCode,
    isError,
    isPending,
    error,
    reset,
  } = useResendRegistrationCode()
  const [email, setEmail] = useState('')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const onSubmit: SubmitHandler<ResendEmailType> = (data: ResendEmailType) => {
    setEmail(data.email)
    resendRegistrationCode(data.email, {
      onSuccess: () => {
        resetForm()
        setIsModalOpen(!isModalOpen)
      },
      onError: (error: unknown) => {
        const err = error as ErrorWithMessageResponse
        setError(err.field as keyof ResendEmailType, {
          type: 'server',
          message: err.message,
        })
        setEmail('')
      },
    })
  }

  return (
    <div className={styles.linkExpiredPage}>
      <div className={styles.title}>Email verification link expired</div>
      <div className={styles.description}>
        Looks like the verification link has expired. Not to worry, we can send the link again
      </div>
      <form className={styles.inputContainer} onSubmit={handleSubmit(onSubmit)}>
        <Input
          label={'Email'}
          type={'email'}
          placeholder={'Epam@epam.com'}
          required={false}
          error={!!errors.email}
          errorText={errors.email?.message}
          {...register('email')}
        />
        <div className={styles.buttonContainer}>
          <Button type={'submit'} variant={'primary'} disabled={isPending}>
            {isPending && <Spinner />}Resend verification link
          </Button>
        </div>
      </form>
      <Image src={confirmCodeImg} alt={'linkExpiredImg'} />
      <Modal isOpen={isModalOpen} title={'Email sent'} onClose={() => setIsModalOpen(!isModalOpen)}>
        We have sent a link to confirm your email to {email}
      </Modal>
    </div>
  )
}
