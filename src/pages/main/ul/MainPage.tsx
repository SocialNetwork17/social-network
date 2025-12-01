"use client"
import styles from './MainPage.module.scss'
import UserAmount from './UserAmount/UserAmount'
import Posts from './Posts/Posts'
import {useSearchParams} from "next/navigation";
import {useEffect} from "react";
import {useRegistrationConfirmation} from "@/pages/main/model/useRegistrationConfirmation";
import {useRouter} from "next/navigation";
import {PATH} from "@/shared/constants/routings";

export default function MainPage() {

    const registrationConfirm = useRegistrationConfirmation()

    const router = useRouter()
    const searchParams = useSearchParams()
    const code = searchParams?.get("code")


    useEffect(() => {
        if(!code) return
        registrationConfirm.mutate(code, {
            onSuccess: () => {
                router.push(PATH.CONGRATULATIONS)
            }
        })
    }, []);


  return (
    <div className={styles.container}>
      <UserAmount />
      <Posts />
    </div>
  )
}
