'use client'
import styles from "./AccountManagementContent.module.scss"
import { useEffect, useState} from "react";
import {useModal} from "@/widgets/modal/model/modal.context";
import { infoModalAC} from "@/widgets/modal/model/modal.types";
import {useSubscriptions} from "@/features/subscriptions/hooks/useSubscriptions";
import {useRouter, useSearchParams} from "next/navigation";
import {CurrentSubscriptionSection} from "@/pages/settings/ui/TabsContent/AccountManagementContent/ui/CurrentSubscriptionSection/CurrentSubscriptionSection";
import {AccountTypeSection} from "@/pages/settings/ui/TabsContent/AccountManagementContent/ui/AccountTypeSection/AccountTypeSection";
import {SubscriptionPurchaseSection} from "@/pages/settings/ui/TabsContent/AccountManagementContent/ui/SubscriptionPurchaseSection/SubscriptionPurchaseSection";
import {PATH} from "@/shared/constants/routings";

export const AccountManagementContent = () => {

    const [accountType, setAccountType] = useState<'personal' | 'business'>('personal')
    const {hasActiveSubscription, isBusinessAccount} = useSubscriptions()

    const searchParams = useSearchParams()
    const router = useRouter()
    const {pushModal} = useModal()

    const part = searchParams?.get('part')
    const success = searchParams?.get('success')
    const error = searchParams?.get('error')

    // Эффект для установки типа аккаунта на основе подписки
    useEffect(() => {
        if (isBusinessAccount) {
            setAccountType('business')
        }
    }, [hasActiveSubscription]) // Зависимость только от hasActiveSubscription

    useEffect(() => {
        if (!searchParams) return

        // Проверяем, что мы на вкладке subscriptions и есть success=true
        if (part === 'subscriptions' && success === 'true') {
            pushModal(infoModalAC({
                title: 'Success',
                description: 'Payment was successful!',
                buttonTitle: 'OK',
            }))
        }

        if (part === 'subscriptions' && error === 'true'
        ) {
            pushModal(infoModalAC({
                title: 'Error',
                description: 'Transaction failed. Please, write to support',
                buttonTitle: 'Back to payment',
            }))
        }
        router.replace(`${PATH.SETTINGS}?part=subscriptions`)
    }, [part, success, error])

    return (        
        <div className={styles.accountManagementContainer}>
            {isBusinessAccount  && <CurrentSubscriptionSection/>}

            <AccountTypeSection accountType={accountType} setAccountType={setAccountType}/>

            {accountType === 'business' && <SubscriptionPurchaseSection/>}
        </div>
    )
}