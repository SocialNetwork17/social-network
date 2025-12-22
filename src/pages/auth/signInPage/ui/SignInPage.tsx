import styles from './SignInPage.module.scss'
import { SignInForm } from '@/features/signIn/ui/SignInForm'

type Props = {}

export const SignInPage = (props: Props) => {
  return (
    <div className={styles.authPage}>
      <SignInForm />
    </div>
  )
}
