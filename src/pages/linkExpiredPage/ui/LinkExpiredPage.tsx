"use client"
import styles from "./LinkExpiredPage.module.scss"
import {Input} from "@/shared/ui/Input/Input";
import {resendEmailSchema, ResendEmailType} from "@/pages/linkExpiredPage/lib/linkExpiredSchema";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/shared/ui/Button/Button";
import {useResendConfirmationCode} from "@/pages/linkExpiredPage/model/useResendConfirmationCode";
import confirmCodeImg from "@/../public/registrationCodeExpired.svg"
import Image from "next/image";
import {Modal} from "@/shared/ui/Modal/Modal";
import {useState} from "react";


export const LinkExpiredPage = () => {

    const {
        register,
        handleSubmit,
        setError,
        reset: resetForm,
        formState: { errors },
    } = useForm<ResendEmailType>({
        resolver: zodResolver(resendEmailSchema),
        mode: "all",
    })

    const {mutate: resendConfirmation, isError, isPending, error, reset} = useResendConfirmationCode()
    const [email, setEmail] = useState('')


    const onSubmit: SubmitHandler<ResendEmailType>  = (data: ResendEmailType) => {
        resendConfirmation(data.email, {
            onSuccess: () => {
                setEmail(data.email)
                resetForm()
            },
            onError: (error) => {
                setError("email", {
                    type: "server",
                    message: error.message
                })
            }
        })
    }


    return (
        <div className={styles.linkExpiredPage}>
            <div className={styles.title}>
                Email verification link expired
            </div>
            <div className={styles.description}>
                Looks like the verification link has expired. Not to worry, we can send the link again
            </div>
            <form className={styles.inputContainer} onSubmit={ handleSubmit(onSubmit)}>
                <Input
                    label={"Email"}
                    type={"email"}
                    placeholder={"Epam@epam.com"}
                    required={false}
                    {...register("email")}
                />
                <div className={styles.buttonContainer}>
                    <Button
                        type={"submit"}
                        variant={"primary"}
                        disabled={false}
                    >
                        Resend verification link
                    </Button>
                </div>
            </form>
            <Image src={confirmCodeImg} alt={'linkExpiredImg'}/>
            <Modal
                isOpen={isError}
                title={"Email sent"}
                onClose={reset}
            >
                We have sent a link to confirm your email to {email}
            </Modal>
        </div>
    );
};