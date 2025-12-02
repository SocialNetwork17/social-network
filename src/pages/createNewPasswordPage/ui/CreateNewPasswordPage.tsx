import styles from './CreateNewPasswordPage.module.scss'
import {Input} from "@/shared/ui/Input/Input";
import {Button} from "@/shared/ui/Button/Button";

export const CreateNewPasswordPage = () => {
    return (
        <div className={styles.CreateNewPasswordPage}>
            <h2 className={styles.title}>Create New Password</h2>
            <div className={styles.inputsWrapper}>
                <Input errorText={'asfsadf'} error={false} label={'New password'} type={'password'} placeholder={'******************'} required={false} />
                <Input errorText={'asfsadf'} error={false} label={'Password confirmation'} type={'password'} placeholder={'******************'} required={false} />
            </div>
             <p className={styles.text}>Your password must be between 6 and 20 characters</p>
            <Button variant={'primary'} disabled={false}>
                Create new password
            </Button>
        </div>
    )
}