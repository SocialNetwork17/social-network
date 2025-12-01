'use client'

import styles from "./SignInForm.module.scss";
import {SignInFormTitle} from "@/features/signIn/ui/singInFormTitle/SingInFormTitle";
import {Input} from "@/shared/ui/Input/Input";
import Link from "next/link";
import {PATH} from "@/shared/constants/routings";
import {Button} from "@/shared/ui/Button/Button";
import {useState} from "react";

export const SignInForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    // const loginMutation = useLoginMutation();


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("Email:", email);
        console.log("Password:", password);
    };


    return (
        <div className={styles.authCard}>
            <SignInFormTitle/>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputWrapper}>
                    <Input
                        label={"Email"}
                        type={"email"}
                        placeholder={"epam@epam.com"}
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        // disabled={loginMutation.isPending}
                    />

                    <Input
                        label={"Password"}
                        type={"password"}
                        placeholder={"add password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        // disabled={loginMutation.isPending}
                    />
                </div>

                <div>
                    <Link href={PATH.FORGOT_PASSWORD} className={styles.fargotPasswordLink}>Forgot Password</Link>

                    <Button variant={"primary"} disabled={false}
                            type="submit">
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
