"use client"
import styles from './SignUpForm.module.scss'
import {SingUpFormTitle} from '@/features/signUp/ui/singUpFormTitle/SingUpFormTitle'
import {Input} from '@/shared/ui/Input/Input'
import {Checkbox} from '@/shared/ui/Checkbox/Checkbox'
import Link from 'next/link'
import {PATH} from '@/shared/constants/routings'
import {Button} from '@/shared/ui/Button/Button'
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {registrationSchema, RegistrationType} from "@/features/signUp/lib/registrationSchema";
import {useState} from "react";
import {useRegistration} from "@/features/signUp/model/useRegistration";

type Props = {}

export const SignUpForm = (props: Props) => {

    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
        reset,
        trigger
    } = useForm<RegistrationType>({
        resolver: zodResolver(registrationSchema),
        mode: "all",
        defaultValues: {
            userName: "",
            email: "",
            password: "",
            passwordConfirmation: "",
        }
    })

    const [checked, setChecked] = useState<boolean>(false)

    const registration = useRegistration()

    const onSubmit: SubmitHandler<RegistrationType> = (data) =>  {
        registration.mutate(data, {
            onSuccess: () => {
                reset()
                setChecked(false)
            }
        })

    }

    return (
        <div className={styles.authCard}>
            <SingUpFormTitle/>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputsWrapper}>
                    <Input
                        label={'User name'}
                        type={'text'} placeholder={'Epam11'}
                        required={true}
                        error={!!errors.userName}
                        errorText={errors.userName?.message}
                        {...register("userName")}
                    />
                    <Input
                        label={'Email'}
                        type={'email'}
                        placeholder={'Epam@epam.com'}
                        required={true}
                        error={!!errors.email}
                        errorText={errors.email?.message}
                        {...register("email")}
                    />
                    <Input
                        label={'Password'}
                        type={'password'}
                        placeholder={'add password'}
                        required={true}
                        error={!!errors.password}
                        errorText={errors.password?.message}
                        {...register("password")}
                    />
                    <Input
                        label={'Password confirmation'}
                        type={'password'}
                        placeholder={'confirm password'}
                        required={true}
                        error={!!errors.passwordConfirmation}
                        errorText={errors.passwordConfirmation?.message}
                        {...register("passwordConfirmation")}
                    />
                </div>
                <div className={styles.confirmWrapper}>
                    <Checkbox
                        checked={checked}
                        onChangeCheckedAction={setChecked}
                    />
                    <span className={styles.agreeText}>
                            I agree to the{' '}
                        <Link href={PATH.SERVICES} className={styles.link}>
                            Terms of Service{' '}
                        </Link>
                            and{' '}
                        <Link href={PATH.POLICY} className={styles.link}>
                            Privacy Policy
                        </Link>
                    </span>
                </div>
                <Button
                    variant={'primary'}
                    disabled={!isValid || !checked}
                    type={"submit"}
                >
                    Sign Up
                </Button>
                <div className={styles.helperText}>
                    <div>Do you have an account?</div>
                    <div>
                        <Link href={PATH.SIGN_IN} className={styles.singInLink}>
                            Sign In
                        </Link>
                    </div>
                </div>
            </form>
            {registration.error && <div onClick={() =>registration.reset()}>{registration.error.message}</div>}
        </div>
    )
}
