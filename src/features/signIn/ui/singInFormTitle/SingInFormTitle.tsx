import styles from './SingInFormTitle.module.scss'
import {IconButton} from "@/shared/ui/IconButton/IconButton";

export const SignInFormTitle = () => {
  return (
    <div>
      <div className={styles.title}>Sign In</div>
        <div className={styles.iconContainer}>
            <IconButton iconId={'googleIcon'} size={36} />
            <IconButton iconId={'githubIcon'} size={36} />
        </div>
    </div>
  )
}
