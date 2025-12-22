import styles from './ForgotPasswordPage.module.scss'
import { ForgotPasswordForm } from '@/features/forgotPassword/ui/ForgotPasswordForm'

export const ForgotPasswordPage = () => {
  return (
    <div className={styles.authPage}>
      <ForgotPasswordForm />
    </div>
  )
}
