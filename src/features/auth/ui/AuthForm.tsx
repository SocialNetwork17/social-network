import styles from "./AuthForm.module.scss"
import {AuthFormTitle} from "@/features/auth/ui/authFormTitle/AuthFormTitle";
import {Input} from "@/shared/ui/Input/Input";
import {Checkbox} from "@/shared/ui/Checkbox/Checkbox";

type Props = {

};

export const AuthForm = (props: Props) => {

    return (
        <div className={styles.authCard}>
            <AuthFormTitle/>
            <div className={styles.inputWrapper}>
                <Input
                    label={"Username"}
                    type={"text"}
                    placeholder={"Epam11"}
                    required={true}
                />
                <Input
                    label={"Email"}
                    type={"email"}
                    placeholder={"Epam@epam.com"}
                    required={true}
                />
                <Input
                    label={"Password"}
                    type={"password"}
                    placeholder={"add password"}
                    required={true}
                />
                <Input
                    label={"Password confirmation"}
                    type={"password"}
                    placeholder={"confirm password"}
                    required={true}
                />
                <div className={styles.confirmWrapper}>
                    <Checkbox disabled />
                    <span className={styles.agreetText}>
                        I agree to the
                        Terms of Service
                        and
                        Privacy Policy
                    </span>
                </div>
            </div>
        </div>
    );
};