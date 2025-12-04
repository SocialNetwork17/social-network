'use client'

import styles from './ForgotPasswordPage.module.scss'
import {Input} from "@/shared/ui/Input/Input";
import {Button} from "@/shared/ui/Button/Button";
import Link from "next/link";
import {PATH} from "@/shared/constants/routings";
import {Recaptcha} from "@/shared/ui/Recaptcha/Recaptcha";
import {useState} from "react";

export const ForgotPasswordPage = () => {
    const [linkSent, setLinkSent] = useState(false)

    return (
        <div className={styles.ForgotPasswordPage}>
            <h2 className={styles.title}>Forgot Password</h2>
            <form className={styles.form}>
                <Input errorText={'asfsadf'} error={true} label={'Email'} type={'email'} placeholder={'Epam@epam.com'} required={false} />
                <p className={styles.text}>Enter your email address and we will send you further instructions </p>
                {!linkSent ?
                    (<>
                        <div className={styles.buttonContainer}>
                            <Button variant={'primary'} disabled={false} type={"submit"}>
                                Send Link
                            </Button>
                        </div>
                    </>) :
                    (<>
                        <p className={`${styles.text} ${styles.successText}`}>The link has been sent by email.<br/>
                            If you don’t receive an email send link again</p>
                        <div className={styles.buttonContainer}>
                            <Button variant={'primary'} disabled={false} type={"submit"}>
                                Send Link Again
                            </Button>
                        </div>

                    </>)
                }
            </form>
            <div className={styles.linkContainer}>
                <Link href={PATH.SIGN_IN} className={styles.singInLink}>
                    Back to Sign In
                </Link>
            </div>
            {!linkSent &&
                <div className={styles.recaptchaContainer}>
                    <Recaptcha isError={false}/>
                </div>
            }
        </div>
    )
}