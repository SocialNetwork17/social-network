import styles from "./AccountManagementContent.module.scss"

import {RadioGroup} from "@/shared/ui/Radio/RadioGroup";
import {useEffect, useState} from "react";
import {IconButton} from "@/shared/ui/IconButton/IconButton";
import {useModal} from "@/widgets/modal/model/modal.context";
import {createPaymentModalAC, infoModalAC} from "@/widgets/modal/model/modal.types";
import {
    PaymentType,
    SubscriptionType, useCurrentSubscription,
    useSubscriptionCosts
} from "@/features/subscriptions/api/subscriptionApi";
import {useProfileQuery} from "@/features/editAvatar/lib/useProfileQuery";
import {Checkbox} from "@/shared/ui/Checkbox/Checkbox";
import * as React from "react";
import {formatToDDMMYYYY} from "@/shared/utils/dateFormat";
import {useSubscriptions} from "@/features/subscriptions/hooks/useSubscriptions";
import {useRouter, useSearchParams} from "next/navigation";

type UiSubscriptionType = 'DAY' | 'WEEKLY' | 'MONTHLY'

export const AccountManagementContent = () => {
    const [accountType, setAccountType] = useState<'personal' | 'business'>('personal')
    const [costsValue, setCostsValue] = useState<UiSubscriptionType>('DAY')
    const [_, setAutoRenewalSubscription] = useState<boolean>(false)
    const [hasShownSuccess, setHasShownSuccess] = useState(false)
    const [hasShownError, setHasShownError] = useState(false)

    // Получаем данные о стоимости подписок из API
    const { data: subscriptionCosts, isLoading } = useSubscriptionCosts()
    const { data: profile, isLoading: isLoadingProfile } = useProfileQuery()
    const {data: currentSubscriptions} = useCurrentSubscription()
    const { handleToggleAutoRenewal } = useSubscriptions()

    console.log(subscriptionCosts)
    const searchParams = useSearchParams()
    const router = useRouter()
    const {pushModal, popModal} = useModal()



    useEffect(() => {
        if (!searchParams) return

        const part = searchParams.get('part')
        const success = searchParams.get('success')
        const error = searchParams.get('error')

        // Проверяем, что мы на вкладке subscriptions и есть success=true
        if (part === 'subscriptions' && success === 'true' && !hasShownSuccess) {
            setHasShownSuccess(true)
            pushModal(infoModalAC({
                title: 'Success',
                description: 'Payment was successful!',
                buttonTitle: 'OK',
                onClose: () => {
                    popModal()
                }
            }))
        }

        if (part === 'subscriptions' && error === 'true' && !hasShownError) {
            setHasShownError(true)
            pushModal(infoModalAC({
                title: 'Error',
                description: 'Transaction failed. Please, write to support',
                buttonTitle: 'Back to payment',
                onClose: () => {
                    popModal()
                }
            }))
        }
        router.replace('/settings?part=subscriptions')
    }, [searchParams, pushModal, router, hasShownSuccess, hasShownError])

    const currentSubscription = currentSubscriptions?.data.find( subscription => subscription.userId === profile?.id)

    // Создаем опции для RadioGroup на основе данных из API
    const costOptions = React.useMemo(() => {
        if (!subscriptionCosts) return []

        return subscriptionCosts.map(cost => {
            let label
            switch (cost.typeDescription) {
                case 'DAY':
                    label = `$${cost.amount} per 1 Day`
                    break
                case 'WEEKLY':
                    label = `$${cost.amount} per 7 Days`
                    break
                case 'MONTHLY':
                    label = `$${cost.amount} per month`
                    break
                default:
                    label = `$${cost.amount}`
            }

            return {
                value: cost.typeDescription,
                label: label
            }
        })
    }, [subscriptionCosts])

    // Эффект для установки типа аккаунта на основе подписки
    useEffect(() => {
        if (currentSubscription) {
            setAccountType('business')
        }
    }, [currentSubscription]) // Зависимость только от hasActiveSubscription

    console.log(currentSubscription)

    const openSubscriptionModal = (paymentType: PaymentType, typeSubscription: SubscriptionType) => {
        pushModal(createPaymentModalAC({
            title: 'Create payment',
            description: 'Auto-renewal will be enabled with this payment. You can disable it anytime in your profile settings',
            paymentType,
            typeSubscription
        }))
    }

    const handleAutoRenewalChange = async (isAutoRenewalSubscription: boolean) => {
        setAutoRenewalSubscription(isAutoRenewalSubscription)
        try {
            // Вызываем функцию с булевым значением
            await handleToggleAutoRenewal(isAutoRenewalSubscription)
        } catch (error) {
            // Если ошибка, возвращаем предыдущее состояние
            setAutoRenewalSubscription(!isAutoRenewalSubscription)
            console.error('Failed to toggle auto-renewal:', error)
        }
    }

    return (        
        <div className={styles.accountManagementContainer}>
            {currentSubscription  &&
            <div className={styles.accountManagementBlock}>
                <h4 className={styles.accountManagementTitle}>Current Subscription:</h4>
                <div className={`${styles.accountManagementContent}  ${styles.currentSubscriptionBlock}`}>
                    <div className={styles.currentSubscriptionContent}>
                        <h5 className={styles.currentSubscriptionTitle}>
                            Expire at
                        </h5>
                        <p className={styles.currentSubscriptionDate}>
                            {formatToDDMMYYYY(currentSubscription.endDateOfSubscription)}
                        </p>
                    </div>
                    <div className={styles.currentSubscriptionContent}>
                        <h5 className={styles.currentSubscriptionTitle}>
                            Next payment
                        </h5>
                        <p className={styles.currentSubscriptionDate}>
                            {formatToDDMMYYYY(currentSubscription.endDateOfSubscription)}
                        </p>
                    </div>
                </div>
                <Checkbox label="Auto-Renewal"
                          checked={currentSubscription?.autoRenewal}
                          onChangeCheckedAction={handleAutoRenewalChange}
                />
            </div>
            }
            <div className={styles.accountManagementBlock}>
                <h4 className={styles.accountManagementTitle}>Account type:</h4>
                <div className={styles.accountManagementContent}>
                    <RadioGroup
                        name="tariff"
                        options={[
                            { value: 'personal', label: 'Personal'},
                            { value: 'business', label: 'Business'},
                        ]}
                        value={accountType}
                        onChange={(value) => setAccountType(value as 'personal' | 'business')}
                    />
                </div>
            </div>
            {accountType ===  'business' &&
            <div className={styles.accountManagementBlock}>
                <h4 className={styles.accountManagementTitle}>Your subscription costs:</h4>
                <div className={styles.accountManagementContent}>
                    <RadioGroup
                        name="costs"
                        options={costOptions}
                        value={costsValue}
                        onChange={(value) => setCostsValue(value as UiSubscriptionType)}
                    />
                </div>
                <div className={styles.paymentBlock}>
                    <IconButton iconId={'paypal'}
                                size={96}
                                viewBox={'0 0 96 64'}
                                onClick={() => openSubscriptionModal('PAYPAL', costsValue)}
                    />
                    <span className={styles.paymentBlock}>or</span>
                    <IconButton iconId={'stripe'}
                                size={96}
                                viewBox={'0 0 96 64'}
                                onClick={() => openSubscriptionModal('STRIPE', costsValue)}
                    />
                </div>
            </div>
            }
        </div>
    )
}