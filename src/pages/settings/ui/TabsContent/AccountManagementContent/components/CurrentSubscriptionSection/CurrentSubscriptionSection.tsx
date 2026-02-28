import styles from "@/pages/settings/ui/TabsContent/AccountManagementContent/components/CurrentSubscriptionSection/CurrentSubscriptionSection.module.scss";
import {formatToDDMMYYYY} from "@/shared/utils/dateFormat";
import {Checkbox} from "@/shared/ui/Checkbox/Checkbox";
import {useSubscriptions} from "@/features/subscriptions/hooks/useSubscriptions";
import {useAutoRenewal} from "@/pages/settings/ui/TabsContent/AccountManagementContent/hooks/useAutoRenewal";

export const CurrentSubscriptionSection = () => {

    const {
        currentSubscription: currentSubscriptions,
        currentSubscriptionData
    } = useSubscriptions()

    const { currentAutoRenewal, isUpdating, toggleAutoRenewal } = useAutoRenewal();

    const lastSubscription = currentSubscriptions?.data[currentSubscriptions?.data.length - 1]

    const nextPayment = lastSubscription?.endDateOfSubscription

    return (
        <div className={styles.block}>
            <h4 className={styles.title}>Current Subscription:</h4>
            <div className={`${styles.content}  ${styles.currentBlock}`}>
                <div className={styles.item}>
                    <h5 className={styles.itemTitle}>
                        Expire at
                    </h5>
                    <p className={styles.itemDate}>
                        {formatToDDMMYYYY(currentSubscriptionData?.endDateOfSubscription)}
                    </p>
                </div>
                <div className={styles.item}>
                    <h5 className={styles.itemTitle}>
                        Next payment
                    </h5>
                    <p className={styles.itemDate}>
                        {formatToDDMMYYYY(nextPayment)}
                    </p>
                </div>
            </div>
            <Checkbox label="Auto-Renewal"
                      checked={currentAutoRenewal}
                      onChangeCheckedAction={toggleAutoRenewal}
                      disabled={isUpdating}
            />
        </div>
    )
}