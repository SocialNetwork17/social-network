import styles from "./SignInForm.module.scss";
import {SignInFormTitle} from "@/features/signIn/ui/singInFormTitle/SingInFormTitle";
import {Input} from "@/shared/ui/Input/Input";
import Link from "next/link";
import {PATH} from "@/shared/constants/routings";
import {Button} from "@/shared/ui/Button/Button";

export const SignInForm = () => {
    return (
        <div className={styles.authCard}>
            <SignInFormTitle/>

            <form className={styles.form}>
                <div className={styles.inputWrapper}>
                    <Input
                        label={"Email"}
                        type={"email"}
                        placeholder={"epam@epam.com"}
                        required
                    />

                    <Input
                        label={"Password"}
                        type={"password"}
                        placeholder={"add password"}
                        required
                    />
                </div>

                <div>
                    <Link href={PATH.FORGOT_PASSWORD} className={styles.fargotPasswordLink}>Forgot Password</Link>

                    <Button variant={"primary"} disabled={false}>
                        Sign In
                    </Button>


                    <div className={styles.helperText}>Don't have an account?</div>
                    <Link href={PATH.SIGN_UP} className={styles.signUpLink}>
                        Sign Up
                    </Link>

                </div>


            </form>
        </div>
    );
};
