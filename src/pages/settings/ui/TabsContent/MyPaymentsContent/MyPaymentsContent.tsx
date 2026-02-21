import styles from "./MyPaymentsContent.module.scss"
import {usePaymentHistory} from "@/features/subscriptions/api/subscriptionApi";
import {formatToDDMMYYYY} from "@/shared/utils/dateFormat";
import Pagination from "@/shared/ui/pagination/Pagination";
import {useMemo, useState} from "react";

export const MyPaymentsContent = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10); // или другое значение по умолчанию

    const { data: arrayPaymentHistory } = usePaymentHistory()

    // Вычисляем элементы для текущей страницы
    const currentItems = useMemo(() => {
        if (!arrayPaymentHistory) return [];

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return arrayPaymentHistory.slice(startIndex, endIndex);
    }, [arrayPaymentHistory, currentPage, itemsPerPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    const handleItemsPerPageChange = (option: { label: string }) => {
        setItemsPerPage(Number(option.label));
        setCurrentPage(1); // Сбрасываем на первую страницу при изменении количества элементов
    }

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
                {currentItems?.map((paymentData, index) => (
                    <li key={index} className={styles.myPaymentsElement}>
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
            <div className={styles.myPaymentsPagination}>
                <Pagination
                    totalItems={arrayPaymentHistory?.length || 0}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                    onSelectChange={handleItemsPerPageChange}
                />
            </div>
        </>
    )
}