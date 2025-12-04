
// 19971971qq12Q!
// mariasemenovadev@gmail.com

'use client'

import styles from "./SignInForm.module.scss";
import {SignInFormTitle} from "@/features/signIn/ui/singInFormTitle/SingInFormTitle";
import {Input} from "@/shared/ui/Input/Input";
import Link from "next/link";
import {PATH} from "@/shared/constants/routings";
import {Button} from "@/shared/ui/Button/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, SignInFormValues } from "@/features/signIn/lib/signInSchema";
import { useLoginMutation } from "@/features/auth/api/useLoginMutation";



export const SignInForm = () => {


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInFormValues>({
        resolver: zodResolver(signInSchema),
        mode: "onBlur",
    });
    

    const loginMutation = useLoginMutation();

    const onSubmit = (data: SignInFormValues) => {
        loginMutation.mutate(data);
    };



    return (
        <div className={styles.authCard}>
            <SignInFormTitle/>

            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputWrapper}>
                    <Input
                        label="Email"
                        type="email"
                        placeholder="epam@epam.com"
                        required
                        disabled={loginMutation.isPending}
                        {...register("email")}
                    />
                    {errors.email && (
                        <div className={styles.error}>{errors.email.message}</div>
                    )}
                    <Input
                        label="Password"
                        type="password"
                        placeholder="add password"
                        required
                        disabled={loginMutation.isPending}
                        {...register("password")}
                    />
                    {errors.password && (
                        <div className={styles.error}>{errors.password.message}</div>
                    )}


                    {loginMutation.isError && (
                        <div style={{ color: "red", marginTop: 8 }}>
                            {(loginMutation.error as any)?.messages?.[0]?.message ??
                                "The email or password are incorrect. Try again please"}
                        </div>
                    )}

                </div>

                <div>
                    <Link href={PATH.FORGOT_PASSWORD} className={styles.fargotPasswordLink}>Forgot Password</Link>

                    <Button variant={"primary"}
                            disabled={loginMutation.isPending}
                            type="submit">
                        Sign In
                    </Button>



                    <div className={styles.helperText}>Don’t have an account?</div>
                    <Link href={PATH.SIGN_UP} className={styles.signUpLink}>
                        Sign Up
                    </Link>

                </div>


            </form>
        </div>
    );
};
