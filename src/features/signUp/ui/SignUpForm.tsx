'use client'
import styles from './SignUpForm.module.scss'
import {SingUpFormTitle} from '@/features/signUp/ui/singUpFormTitle/SingUpFormTitle'
import {Input} from '@/shared/ui/Input/Input'
import {Checkbox} from '@/shared/ui/Checkbox/Checkbox'
import Link from 'next/link'
import {PATH} from '@/shared/constants/routings'
import {Button} from '@/shared/ui/Button/Button'
import {SubmitHandler, useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {registrationSchema, RegistrationType} from '@/features/signUp/lib/registrationSchema'
import {useState} from 'react'
import {Spinner} from '@/shared/ui/Spinner/Spinner'
import {ErrorWithMessageResponse} from '@/shared/types/types'
import {useRegistration} from '@/features/signUp/api/useRegistration'
import {useModal} from "@/widgets/modal/model/modal.context";
import {registrationConfirmModalAC} from "@/widgets/modal/model/modal.types";

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setError,
  } = useForm<RegistrationType>({
    resolver: zodResolver(registrationSchema),
    mode: 'all',
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  })

  const [checked, setChecked] = useState<boolean>(false)
  const {pushModal} = useModal()
  const { mutate: registration, isPending } = useRegistration()

  const onSubmit: SubmitHandler<RegistrationType> = data => {
    registration(data, {
      onSuccess: () => {
        reset()
        setChecked(prevState => !prevState)
        pushModal(registrationConfirmModalAC({
          title: "Email sent",
          email: data.email,
          description: 'We have sent a link to confirm your email to '
        }))
      },
      onError: (error: unknown) => {
        const err = error as ErrorWithMessageResponse
        setError(err.field as keyof RegistrationType, {
          message: err.message,
        })
      },
    })
  }

  return (
      <div className={styles.authCard}>
        <SingUpFormTitle />
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputsWrapper}>
              <Input
                  label={'User name'}
                  type={'text'}
                  placeholder={'Epam11'}
                  required={true}
                  error={!!errors.userName}
                  errorText={errors.userName?.message}
                  {...register('userName')}
              />
              <Input
                  label={'Email'}
                  type={'email'}
                  placeholder={'Epam@epam.com'}
                  required={true}
                  error={!!errors.email}
                  errorText={errors.email?.message}
                  {...register('email')}
              />
            <div className={`${styles.fieldContainer} ${errors.password ? styles.fieldWithError : ''}`}>
              <Input
                  label={'Password'}
                  type={'password'}
                  placeholder={'******************'}
                  required={true}
                  error={!!errors.password}
                  errorText={errors.password?.message}
                  {...register('password')}
              />
            </div>
            <div className={`${styles.fieldContainer} ${errors.passwordConfirmation ? styles.fieldWithError : ''}`}>
              <Input
                  label={'Password confirmation'}
                  type={'password'}
                  placeholder={'******************'}
                  required={true}
                  error={!!errors.passwordConfirmation}
                  errorText={errors.passwordConfirmation?.message}
                  {...register('passwordConfirmation')}
              />
            </div>
          </div>
          <div className={styles.confirmWrapper}>
            <Checkbox checked={checked} onChangeCheckedAction={setChecked} />
            <span className={styles.agreeText}>
            I agree to the{' '}
              <Link href={PATH.SERVICES} className={styles.link}>
              Terms of Service{' '}
            </Link>
            and{' '}
              <Link href={PATH.POLICY} className={styles.link}>
              Privacy Policy
            </Link>
          </span>
          </div>
          <Button variant={'primary'} disabled={!isValid || !checked || isPending} type={'submit'}>
            {isPending && <Spinner />} Sign up
          </Button>
          <div className={styles.helperText}>
            <div>Do you have an account?</div>
            <div>
              <Link href={PATH.SIGN_IN} className={styles.singInLink}>
                Sign In
              </Link>
            </div>
          </div>
        </form>
      </div>
  )
}