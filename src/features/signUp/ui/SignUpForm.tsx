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
import {Modal} from "@/shared/ui/Modal/Modal";
import {SchemaValidationErrorResponseDto} from "@/shared/api/schema";
import {isPending} from "@reduxjs/toolkit";
import {Spinner} from "@/shared/ui/Spinner/Spinner";

type Props = {}

export const SignUpForm = (props: Props) => {

    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
        reset,
        setError
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
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')

    const {mutate: registration, isPending, isError, error} = useRegistration()

    const onSubmit: SubmitHandler<RegistrationType> = (data) =>  {
        setEmail(data.email)
        registration(data, {
            onSuccess: () => {
                reset()
                setChecked(prevState => !prevState)
                setIsModalOpen(!isModalOpen)
            },
            onError: (error) => {
                const message = error.message

                if (message.includes("email")) {
                    setError("email", {
                        type: "server",
                        message: message,
                    });
                }

                if (message.includes("Password")) {
                    setError("password", {
                        type: "server",
                        message: message,
                    });
                }

                if (message.includes("username") || message.includes("userName")) {
                    setError("userName", {
                        type: "server",
                        message: message,
                    });
                }
                setEmail('')
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
                    {isPending && <Spinner/>}  Sign up
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
            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(!isModalOpen)}
                    title={"Email sent"}
                >
                    We have sent a link to confirm your email to {email}
                </Modal>
            )}
        </div>
    )
}
