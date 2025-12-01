import styles from './ForgotPasswordPage.module.scss'
import {Input} from "@/shared/ui/Input/Input";
import {Button} from "@/shared/ui/Button/Button";
import Link from "next/link";
import {PATH} from "@/shared/constants/routings";
import {Recaptcha} from "@/shared/ui/Recaptcha/Recaptcha";

export const ForgotPasswordPage = () => {
    return (
        <div className={styles.ForgotPasswordPage}>
            <h2 className={styles.title}>Forgot Password</h2>
            <Input errorText={'asfsadf'} error={true} label={'Email'} type={'email'} placeholder={'Epam@epam.com'} required={false} />
            <p className={styles.text}>Enter your email address and we will send you further instructions </p>
            <Button variant={'primary'} disabled={false}>
                Send Link
            </Button>
            <div className={styles.linkContainer}>
                <Link href={PATH.SIGN_IN} className={styles.singInLink}>
                    Back to Sign In
                </Link>
            </div>
            <Recaptcha />
        </div>
    )
}