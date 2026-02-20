import styles from "./MyPaymentsContent.module.scss"
import {usePaymentHistory} from "@/features/subscriptions/api/subscriptionApi";
import {formatToDDMMYYYY} from "@/shared/utils/dateFormat";

export const MyPaymentsContent = () => {

    const { data: arrayPaymentHistory} = usePaymentHistory()

    return (
        <>
            <div className={styles.myPaymentsHeader}>
                <p className={`${styles.myPaymentsHeaderTitle} ${styles.myPaymentsDateofPayment}`}>Date of Payment</p>
                <p className={`${styles.myPaymentsHeaderTitle} ${styles.myPaymentsEndDate}`}>End date of subscription</p>
                <p className={`${styles.myPaymentsHeaderTitle} ${styles.myPaymentsPrice}`}>Price</p>
                <p className={`${styles.myPaymentsHeaderTitle} ${styles.myPaymentsSubscriptionType}`}>Subscription Type</p>
                <p className={`${styles.myPaymentsHeaderTitle} ${styles.myPaymentsPaymentType}`}>Payment Type</p>
            </div>
            <ul className={styles.myPaymentsBody}>
                {arrayPaymentHistory?.map(paymentData => (
                    <li className={styles.myPaymentsElement}>
                        <p className={`${styles.myPaymentsData} ${styles.myPaymentsDateofPayment}`}>{formatToDDMMYYYY(paymentData.dateOfPayment)}</p>
                        <p className={`${styles.myPaymentsData} ${styles.myPaymentsEndDate}`}>{formatToDDMMYYYY(paymentData.endDateOfSubscription)}</p>
                        <p className={`${styles.myPaymentsData} ${styles.myPaymentsPrice}`}>{`$${paymentData.price}`}</p>
                        <p className={`${styles.myPaymentsData} ${styles.myPaymentsSubscriptionType}`}>{
                            paymentData.subscriptionType === "MONTHLY" ? '1 month' : paymentData.subscriptionType === "DAY" ? '1 day' : '7 days'
                            }
                        </p>
                        <p className={`${styles.myPaymentsData} ${styles.myPaymentsPaymentType}`}>
                            {paymentData.paymentType === "STRIPE" ? "Stripe" :
                                paymentData.paymentType === "PAYPAL" ? "PayPal" :
                                    "Credit card"
                            }
                        </p>
                    </li>
                ))}
            </ul>
        </>
    )
}