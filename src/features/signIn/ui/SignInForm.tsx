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
                    <div className={`${styles.fieldContainer} ${errors.email ? styles.fieldWithError : ''}`}>
                    <Input
                        label="Email"
                        type="email"
                        placeholder="epam@epam.com"
                        error={!!errors.email}
                        errorText={errors.email?.message}
                        required
                        disabled={loginMutation.isPending}
                        {...register("email")}
                    />
                    </div>

                    <Input
                        label="Password"
                        type="password"
                        placeholder="add password"
                        error={!!errors.password}
                        errorText={errors.password?.message}
                        required
                        disabled={loginMutation.isPending}
                        {...register("password")}
                    />

                    {loginMutation.isError && (
                        <div className={styles.serverError}>
                            The email or password are incorrect. Try again please
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
