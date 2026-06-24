import * as React from 'react';
import styles from "./CreatePaymentModalContent.module.scss"
import {CreatePaymentModalType} from "@/widgets/modal/model/modal.types";
import {Button} from "@/shared/ui/Button/Button";
import {useModal} from "@/widgets/modal/model/modal.context";
import {Checkbox} from "@/shared/ui/Checkbox/Checkbox";
import {useState} from "react";
import {useSubscriptions} from "@/features/subscriptions/hooks/useSubscriptions";
import {Spinner} from "@/shared/ui/Spinner/Spinner";
import {PaymentType, SubscriptionType} from "@/features/subscriptions/model/subscription.types";


type Props = {
    modal: CreatePaymentModalType
}

export const CreatePaymentModalContent = ({modal}: Props) => {
    const {clearModals} = useModal()
    const [agreed, setAgreed] = useState<boolean>(false)
    const { handleCreateSubscription, isCreating } = useSubscriptions()

    const handleCreatePayment = async (subscriptionType: SubscriptionType, paymentType: PaymentType) => {
        if (!agreed) return
        try {
            await handleCreateSubscription(subscriptionType, paymentType, 0)
            clearModals()
        } catch (error) {
            // Ошибка обрабатывается в хуке
        }
    }

    return (
        <>
            <p className={styles.description}>{modal.payload.description}</p>
            <div className={styles.buttonsContainer}>
                <Checkbox label="I agree"  checked={agreed} onChangeCheckedAction={setAgreed} />

                <Button variant={'primary'}
                        width={72}
                        height={36}
                        disabled={!agreed || isCreating}
                        onClick={() => handleCreatePayment(modal.payload.typeSubscription, modal.payload.paymentType)}
                >
                    {isCreating ? <Spinner/> : 'OK'}
                </Button>
            </div>
        </>
    )
}