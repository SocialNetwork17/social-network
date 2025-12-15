import styles from './ForgotPasswordPage.module.scss'
import {ForgotPasswordForm} from "@/features/forgotPassword/ui/ForgotPasswordForm";

type Props = {};

export const ForgotPasswordPage = (props: Props) => {
    return (
        <div className={styles.authPage}>
            <ForgotPasswordForm/>
        </div>
    );
};