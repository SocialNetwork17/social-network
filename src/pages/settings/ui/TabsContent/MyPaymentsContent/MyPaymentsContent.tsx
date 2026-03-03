import styles from "./MyPaymentsContent.module.scss"
import {usePaymentHistory} from "@/features/subscriptions/api/subscriptionApi";
import {formatToDDMMYYYY} from "@/shared/utils/dateFormat";
import Pagination from "@/shared/ui/pagination/Pagination";
import {useEffect, useState} from "react";

export const MyPaymentsContent = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10); // Значение по умолчанию из Swagger

    const { data, isLoading, error } = usePaymentHistory({
        pageNumber,
        pageSize,
    });

    const payments = data?.items || [];
    const totalCount = data?.totalCount || 0;

    // Сбрасываем на первую страницу при изменении pageSize
    useEffect(() => {
        setPageNumber(1);
    }, [pageSize]);

    const handlePageChange = (page: number) => {
        setPageNumber(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePageSizeChange = (option: { label: string }) => {
        setPageSize(Number(option.label));
    };

    if (isLoading) return <div>Payments is loading</div>;
    if (error) return <div>Error loading payments</div>;
    if (!payments.length) return <div>No payments found</div>;

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
                {payments?.map((payment) => (
                    <li key={payment.subscriptionId} className={styles.myPaymentsElement}>
                        <p className={`${styles.myPaymentsData} ${styles.myPaymentsDateofPayment}`}>{formatToDDMMYYYY(payment.dateOfPayment)}</p>
                        <p className={`${styles.myPaymentsData} ${styles.myPaymentsEndDate}`}>{formatToDDMMYYYY(payment.endDateOfSubscription)}</p>
                        <p className={`${styles.myPaymentsData} ${styles.myPaymentsPrice}`}>{`$${payment.price}`}</p>
                        <p className={`${styles.myPaymentsData} ${styles.myPaymentsSubscriptionType}`}>{
                            payment.subscriptionType === "MONTHLY" ? '1 month' : payment.subscriptionType === "DAY" ? '1 day' : '7 days'
                            }
                        </p>
                        <p className={`${styles.myPaymentsData} ${styles.myPaymentsPaymentType}`}>
                            {payment.paymentType === "STRIPE" ? "Stripe" :
                                payment.paymentType === "PAYPAL" ? "PayPal" :
                                    "Credit card"
                            }
                        </p>
                    </li>
                ))}
            </ul>
            <div className={styles.myPaymentsPagination}>
                <Pagination
                    totalItems={totalCount}
                    itemsPerPage={pageSize}
                    currentPage={pageNumber}
                    onPageChange={handlePageChange}
                    onSelectChange={handlePageSizeChange}
                />
            </div>
        </>
    )
}