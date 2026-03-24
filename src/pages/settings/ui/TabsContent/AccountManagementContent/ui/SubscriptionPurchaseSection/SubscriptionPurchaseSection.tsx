import styles from "@/pages/settings/ui/TabsContent/AccountManagementContent/ui/SubscriptionPurchaseSection/SubscriptionPurchaseSection.module.scss";
import {RadioGroup} from "@/shared/ui/Radio/RadioGroup";
import {IconButton} from "@/shared/ui/IconButton/IconButton";
import {useState} from "react";
import {components} from "@/shared/api/schema";
import {createPaymentModalAC} from "@/widgets/modal/model/modal.types";
import {useModal} from "@/widgets/modal/model/modal.context";
import {useSubscriptionCosts} from "@/features/subscriptions/model/useSubscriptionCosts";
import {PaymentType, SubscriptionType} from "@/features/subscriptions/model/subscription.types";

type SubscriptionTypeFromSchema = components['schemas']['CreateSubscriptionInputDto']['typeSubscription'];

export const SubscriptionPurchaseSection = () => {
    const [costsValue, setCostsValue] = useState<SubscriptionTypeFromSchema>('DAY')

    const { data: subscriptionCosts } = useSubscriptionCosts()

    const {pushModal} = useModal()

    // Создаем опции для RadioGroup на основе данных из API
    const costOptions = () => {
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
    }

    const openSubscriptionModal = (paymentType: PaymentType, typeSubscription: SubscriptionType) => {
        pushModal(createPaymentModalAC({
            title: 'Create payment',
            description: 'Auto-renewal will be enabled with this payment. You can disable it anytime in your profile settings',
            paymentType,
            typeSubscription
        }))
    }

    return (
        <div className={styles.block}>
            <h4 className={styles.title}>Your subscription costs:</h4>
            <div className={styles.content}>
                <RadioGroup
                    name="costs"
                    options={costOptions()}
                    value={costsValue}
                    onChange={(value) => setCostsValue(value as SubscriptionTypeFromSchema)}
                />
            </div>
            <div className={styles.paymentBlock}>
                <IconButton iconId={'paypal'}
                            size={96}
                            viewBox={'0 0 96 64'}
                            onClick={() => openSubscriptionModal('PAYPAL', costsValue)}
                />
                <span className={styles.paymentSeparator}>or</span>
                <IconButton iconId={'stripe'}
                            size={96}
                            viewBox={'0 0 96 64'}
                            onClick={() => openSubscriptionModal('STRIPE', costsValue)}
                />
            </div>
        </div>
    )
}