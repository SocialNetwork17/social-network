import styles from './CreateNewPasswordPage.module.scss'
import { CreateNewPasswordForm } from '@/features/createNewPassword/ui/CreateNewPasswordForm'

export const CreateNewPasswordPage = () => {
  return (
    <div className={styles.authPage}>
      <CreateNewPasswordForm />
    </div>
  )
}
