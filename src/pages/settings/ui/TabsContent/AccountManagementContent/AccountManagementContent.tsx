import styles from "./AccountManagementContent.module.scss"

import {RadioGroup} from "@/shared/ui/Radio/RadioGroup";
import {useCallback, useEffect, useState} from "react";
import {IconButton} from "@/shared/ui/IconButton/IconButton";
import {useModal} from "@/widgets/modal/model/modal.context";
import {createPaymentModalAC, infoModalAC} from "@/widgets/modal/model/modal.types";
import {
    PaymentType,
    SubscriptionType, useCancelAutoRenewal, useCurrentSubscription, useRenewAutoRenewal,
    useSubscriptionCosts
} from "@/features/subscriptions/api/subscriptionApi";
import {Checkbox} from "@/shared/ui/Checkbox/Checkbox";
import * as React from "react";
import {formatToDDMMYYYY} from "@/shared/utils/dateFormat";
import {useSubscriptions} from "@/features/subscriptions/hooks/useSubscriptions";
import {useRouter, useSearchParams} from "next/navigation";

type UiSubscriptionType = 'DAY' | 'WEEKLY' | 'MONTHLY'

export const AccountManagementContent = () => {
    const [accountType, setAccountType] = useState<'personal' | 'business'>('personal')
    const [costsValue, setCostsValue] = useState<UiSubscriptionType>('DAY')
    const [optimisticAutoRenewal, setOptimisticAutoRenewal] = useState<boolean | null>(null)
    const [hasShownSuccess, setHasShownSuccess] = useState(false)
    const [hasShownError, setHasShownError] = useState(false)

    // Получаем данные о стоимости подписок из API
    const { data: subscriptionCosts } = useSubscriptionCosts()
    const {data: currentSubscription} = useCurrentSubscription()
    const {
        currentSubscription: currentSubscriptions,
        refetchCurrent,
        hasActiveSubscription,
        isBusinessAccount,
        currentSubscriptionData
    } = useSubscriptions()

    // Мутации для автообновления
    const cancelAutoRenewal = useCancelAutoRenewal()
    const renewAutoRenewal = useRenewAutoRenewal()

    const lastSubscription = currentSubscriptions?.data[currentSubscriptions?.data.length - 1]

    const nextPayment = lastSubscription?.endDateOfSubscription
    console.log(currentSubscriptions)
    console.log(lastSubscription )
    const searchParams = useSearchParams()
    const router = useRouter()
    const {pushModal, popModal} = useModal()

    // Определяем текущее состояние auto-renewal (учитываем optimistic update)
    const currentAutoRenewal = optimisticAutoRenewal !== null
        ? optimisticAutoRenewal
        : currentSubscription?.hasAutoRenewal || false

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
        if (isBusinessAccount) {
            setAccountType('business')
        }
    }, [hasActiveSubscription]) // Зависимость только от hasActiveSubscription

    const openSubscriptionModal = (paymentType: PaymentType, typeSubscription: SubscriptionType) => {
        pushModal(createPaymentModalAC({
            title: 'Create payment',
            description: 'Auto-renewal will be enabled with this payment. You can disable it anytime in your profile settings',
            paymentType,
            typeSubscription
        }))
    }

    // OPTIMISTIC UPDATE для чекбокса
    const handleAutoRenewalChange = useCallback(async (checked: boolean) => {
        // Сохраняем предыдущее состояние на случай ошибки
        const previousValue = currentAutoRenewal

        // Оптимистично обновляем UI
        setOptimisticAutoRenewal(checked)

        try {
            // Отправляем запрос на сервер
            if (checked) {
                await renewAutoRenewal.mutateAsync()
            } else {
                await cancelAutoRenewal.mutateAsync()
            }

            // Обновляем данные с сервера
            await refetchCurrent()
            // Сбрасываем optimistic update после успешного запроса
            setOptimisticAutoRenewal(null)

        } catch (error) {
            // В случае ошибки возвращаем предыдущее значение
            setOptimisticAutoRenewal(previousValue)
            console.error('Failed to toggle auto-renewal:', error)

            // Показываем ошибку пользователю
            pushModal(infoModalAC({
                title: 'Error',
                description: 'Failed to update auto-renewal. Please try again.',
                buttonTitle: 'OK',
                onClose: () => popModal()
            }))
        }
    }, [currentAutoRenewal, renewAutoRenewal, cancelAutoRenewal, refetchCurrent, pushModal, popModal])

    // Сбрасываем optimistic update при размонтировании
    useEffect(() => {
        return () => {
            setOptimisticAutoRenewal(null)
        }
    }, [])

    return (        
        <div className={styles.accountManagementContainer}>
            {isBusinessAccount  &&
            <div className={styles.accountManagementBlock}>
                <h4 className={styles.accountManagementTitle}>Current Subscription:</h4>
                <div className={`${styles.accountManagementContent}  ${styles.currentSubscriptionBlock}`}>
                    <div className={styles.currentSubscriptionContent}>
                        <h5 className={styles.currentSubscriptionTitle}>
                            Expire at
                        </h5>
                        <p className={styles.currentSubscriptionDate}>
                            {formatToDDMMYYYY(currentSubscriptionData?.endDateOfSubscription)}
                        </p>
                    </div>
                    <div className={styles.currentSubscriptionContent}>
                        <h5 className={styles.currentSubscriptionTitle}>
                            Next payment
                        </h5>
                        <p className={styles.currentSubscriptionDate}>
                            {formatToDDMMYYYY(nextPayment)}
                        </p>
                    </div>
                </div>
                <Checkbox label="Auto-Renewal"
                          checked={currentAutoRenewal}
                          onChangeCheckedAction={handleAutoRenewalChange}
                          disabled={cancelAutoRenewal.isPending || renewAutoRenewal.isPending}
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
            {isBusinessAccount &&
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