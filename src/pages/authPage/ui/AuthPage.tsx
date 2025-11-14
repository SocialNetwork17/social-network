import {AuthForm} from "@/features/auth/ui/AuthForm";
import styles from "./AuthPage.module.scss"

type Props = {

};
export const AuthPage = (props: Props) => {
    return (
        <div className={styles.authPage}>

            <AuthForm/>
        </div>
    );
};