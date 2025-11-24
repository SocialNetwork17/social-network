import {SignUpForm} from "@/features/signUp/ui/SignUpForm";
import styles from "./SignUpPage.module.scss"

type Props = {

};
export const SignUpPage = (props: Props) => {
    return (
        <div className={styles.authPage}>
            <SignUpForm/>
        </div>
    );
};