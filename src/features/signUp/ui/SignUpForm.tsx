import styles from './SignUpForm.module.scss'
import { SingUpFormTitle } from '@/features/signUp/ui/singUpFormTitle/SingUpFormTitle'
import { Input } from '@/shared/ui/Input/Input'
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox'
import Link from 'next/link'
import { PATH } from '@/shared/constants/routings'
import { Button } from '@/shared/ui/Button/Button'

type Props = {}

export const SignUpForm = (props: Props) => {
  return (
    <div className={styles.authCard}>
      <SingUpFormTitle />
      <form className={styles.form}>
        <div className={styles.inputWrapper}>
          <Input label={'Username'} type={'text'} placeholder={'Epam11'} required={true} />
          <Input label={'Email'} type={'email'} placeholder={'Epam@epam.com'} required={true} />
          <Input
            label={'Password'}
            type={'password'}
            placeholder={'add password'}
            required={true}
          />
          <Input
            label={'Password confirmation'}
            type={'password'}
            placeholder={'confirm password'}
            required={true}
          />
        </div>
        <div className={styles.confirmWrapper}>
          <Checkbox />
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
        <Button variant={'primary'} disabled={false}>
          Sing Up
        </Button>
        <div className={styles.helperText}>
          <div>Do you have an account?</div>
          <div>
            <Link href={PATH.SIGN_IN} className={styles.singInLink}>
              Sing In
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}
