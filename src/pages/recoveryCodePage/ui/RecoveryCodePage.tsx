"use client"
import {Button} from "@/shared/ui/Button/Button";
import {Spinner} from "@/shared/ui/Spinner/Spinner";
import Image from "next/image";
import confirmCodeImg from "../../../../public/registrationCodeExpired.svg";
import {Modal} from "@/shared/ui/Modal/Modal";
import {useState} from "react";
import styles from "@/pages/recoveryCodePage/ui/RecoveryCodePage.module.scss"
import {usePasswordRecoveryMutation} from "@/pages/recoveryCodePage/api/usePasswordRecoveryMutation";

export const RecoveryCodePage = () => {


    const {mutate: passwordRecovery, isPending} = usePasswordRecoveryMutation()

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const onClickHandler = () => {
        const email = localStorage.getItem('recoveryEmail')
        if(!email) return
        passwordRecovery(email, {
            onSuccess: () => {
                setIsModalOpen(!isModalOpen)
            }
        })
    }


    return (
        <div className={styles.recoveryCodePage}>
            <div className={styles.title}>
                Email verification link expired
            </div>
            <div className={styles.description}>
                Looks like the verification link has expired. Not to worry, we can send the link again
            </div>
                <div className={styles.buttonContainer}>
                    <Button
                        onClick={onClickHandler}
                        variant={"primary"}
                        disabled={false}
                    >
                        {isPending && <Spinner/>}Resend link
                    </Button>
                </div>
            <Image src={confirmCodeImg} alt={'linkExpiredImg'}/>
            <Modal
                isOpen={isModalOpen}
                title={"Email sent"}
                onClose={() => setIsModalOpen(!isModalOpen)}
            >
                We have sent a link to confirm your email to {localStorage.getItem('recoveryEmail')}
            </Modal>
        </div>
    );
};