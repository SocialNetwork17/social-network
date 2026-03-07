'use client'

import styles from './SignInForm.module.scss'
import { SignInFormTitle } from '@/features/signIn/ui/singInFormTitle/SingInFormTitle'
import { Input } from '@/shared/ui/Input/Input'
import Link from 'next/link'
import { PATH } from '@/shared/constants/routings'
import { Button } from '@/shared/ui/Button/Button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignInFormValues, signInSchema } from '@/features/signIn/lib/signInSchema'
import { useLoginMutation } from '@/features/signIn/api/useLoginMutation'
import { Spinner } from '@/shared/ui/Spinner/Spinner'

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    mode: 'onBlur',
  })

  const { mutate: loginMutation, isPending, isError } = useLoginMutation()

  const onSubmit = (data: SignInFormValues) => {
    loginMutation({ ...data, email: data.email.toLowerCase() })
  }

  return (
      <div className={styles.authCard}>
        <SignInFormTitle />

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputWrapper}>
            <div className={`${styles.fieldContainer} ${errors.email ? styles.fieldWithError : ''}`}>
              <Input
                  label="Email"
                  type="email"
                  placeholder="epam@epam.com"
                  error={!!errors.email}
                  errorText={errors.email?.message}
                  required
                  disabled={isPending}
                  {...register('email')}
              />
            </div>

            <div className={`${styles.fieldContainer} ${errors.password ? styles.fieldWithError : ''}`}>
              <Input
                  label="Password"
                  type="password"
                  placeholder="**********"
                  error={!!errors.password}
                  errorText={errors.password?.message}
                  required
                  disabled={isPending}
                  {...register('password')}
              />
            </div>

            {isError && (
                <div className={styles.serverError}>
                  The email or password are incorrect. Try again please
                </div>
            )}
          </div>

          <div>
            <Link href={PATH.FORGOT_PASSWORD} className={styles.fargotPasswordLink}>
              Forgot Password
            </Link>

            <div className={styles.signInButtonContainer}>
              <Button variant={'primary'} disabled={isPending} type="submit">
                {isPending && <Spinner />} Sign In
              </Button>
            </div>

            <div className={styles.helperText}>Don't have an account?</div>
            <div className={styles.signUpLinkContainer}>
              <Link href={PATH.SIGN_UP} className={styles.signUpLink}>
                Sign Up
              </Link>
            </div>
          </div>
        </form>
      </div>
  )
}