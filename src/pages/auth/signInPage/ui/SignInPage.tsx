import styles from './SignInPage.module.scss'
import { SignInForm } from '@/features/signIn/ui/SignInForm'

export const SignInPage = () => {
  return (
    <div className={styles.authPage}>
      <SignInForm />
    </div>
  )
}
