import { SignUpForm } from '@/features/signUp/ui/SignUpForm'
import styles from './SignUpPage.module.scss'

export const SignUpPage = () => {
  return (
    <div className={styles.authPage}>
      <SignUpForm />
    </div>
  )
}
