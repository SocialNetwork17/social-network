"use client"
import {useRegistrationConfirmation} from "@/pages/emailCallBackPage/api/useRegistrationConfirmation";
import {useParams, useRouter, useSearchParams} from "next/navigation";
import {useCheckRecoveryCode} from "@/pages/emailCallBackPage/api/useCheckRecoveryCode";
import styles from "@/pages/emailCallBackPage/ui/EmailCallbackPage.module.scss";
import {Loader} from "@/shared/ui/Loader/Loader";
import {useEffect} from "react";
import {PATH} from "@/shared/constants/routings";

export const EmailCallbackPage = () => {

    const router = useRouter()
    const searchParams = useSearchParams()
    const code = searchParams?.get("code")

    const params = useParams<{ type: 'registration' | 'recovery' }>()

    const {mutate: registrationConfirm, isPending: isRegistrationLoad} = useRegistrationConfirmation()
    const {mutate: checkRecoveryCode, isPending: isRecoveryLoad} = useCheckRecoveryCode()

    if (!params) {
        return <div>Invalid link</div>
    }

    const {type} = params


    useEffect(() => {
        if (type === 'registration' && code) {
            registrationConfirm(code, {
                onSuccess: () => {
                    router.push(PATH.CONGRATULATIONS)
                },
                onError: () => {
                    router.push(PATH.LINK_EXPIRED_EMAIL)
                }
            })
        }
        if (type === 'recovery' && code) {
            checkRecoveryCode(code, {
                onSuccess: () => {
                    router.push(`${PATH.CREATE_NEW_PASSWORD}?code=${code}`)
                },
                onError: () => {
                    router.push(PATH.LINK_EXPIRED_RECOVERY_CODE)
                }
            })
        }

    }, [])

    if (isRecoveryLoad || isRegistrationLoad) {
        return (
            <div className={styles.emailCallbackPage}>
                <Loader/>
            </div>

        )
    }


    return (
        <div>

        </div>
    );
};
