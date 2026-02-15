import styles from "./AccountManagementContent.module.scss"

import {RadioGroup} from "@/shared/ui/Radio/RadioGroup";
import {useEffect, useState} from "react";
import {IconButton} from "@/shared/ui/IconButton/IconButton";
import {useModal} from "@/widgets/modal/model/modal.context";
import {createPaymentModalAC} from "@/widgets/modal/model/modal.types";
import {
    CurrentSubscription,
    PaymentType,
    SubscriptionType, useCurrentSubscription,
    useSubscriptionCosts
} from "@/features/subscriptions/api/subscriptionApi";
import {useProfileQuery} from "@/features/editAvatar/lib/useProfileQuery";
import {Checkbox} from "@/shared/ui/Checkbox/Checkbox";
import * as React from "react";
import {formatToDDMMYYYY} from "@/shared/utils/dateFormat";

type UiSubscriptionType = 'DAY' | 'WEEKLY' | 'MONTHLY'

export const AccountManagementContent = () => {
    const [accountType, setAccountType] = useState<'personal' | 'business'>('personal')
    const [costsValue, setCostsValue] = useState<UiSubscriptionType>('DAY')
    const [autoRenewalSubscription, setAutoRenewalSubscription] = useState<boolean>(false)

    // Получаем данные о стоимости подписок из API
    const { data: subscriptionCosts, isLoading } = useSubscriptionCosts()
    const { data: profile, isLoading: isLoadingProfile } = useProfileQuery()
    const {data: currentSubscriptions} = useCurrentSubscription()

    console.log(subscriptionCosts)

    const {pushModal, popModal} = useModal()

    const currentSubscription = currentSubscriptions?.data.find( subscription => subscription.userId === profile?.id)

    // Создаем опции для RadioGroup на основе данных из API
    const costOptions = React.useMemo(() => {
        if (!subscriptionCosts) return []

        return subscriptionCosts.map(cost => {
            let label = ''
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
                <Checkbox label="Auto-Renewal"  checked={autoRenewalSubscription} onChangeCheckedAction={setAutoRenewalSubscription} />
            </div>
            }
            <div className={styles.accountManagementBlock}>
                <h4 className={styles.accountManagementTitle}>Account type:</h4>
                <div className={styles.accountManagementContent}>
                    <RadioGroup
                        name="tariff"
                        options={[
                            { value: 'personal', label: 'Personal'},
                            { value: 'business', label: 'Business' },
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
                        onChange={()=>setCostsValue}
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