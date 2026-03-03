import { useState } from 'react';
import {
    useCancelAutoRenewal,
    useRenewAutoRenewal,
    useCurrentSubscription
} from "@/features/subscriptions/api/subscriptionApi";
import { useSubscriptions } from "@/features/subscriptions/hooks/useSubscriptions";

export const useAutoRenewal = () => {
    const [optimisticAutoRenewal, setOptimisticAutoRenewal] = useState<boolean | null>(null);
    const { data: currentSubscription } = useCurrentSubscription();
    const { refetchCurrent } = useSubscriptions();
    const cancelAutoRenewal = useCancelAutoRenewal();
    const renewAutoRenewal = useRenewAutoRenewal();

    const currentAutoRenewal = optimisticAutoRenewal !== null
        ? optimisticAutoRenewal
        : currentSubscription?.hasAutoRenewal || false;

    const isUpdating = cancelAutoRenewal.isPending || renewAutoRenewal.isPending;

    const toggleAutoRenewal = async (checked: boolean) => {
        const previousValue = currentAutoRenewal;
        setOptimisticAutoRenewal(checked);

        try {
            if (checked) {
                await renewAutoRenewal.mutateAsync();
            } else {
                await cancelAutoRenewal.mutateAsync();
            }

            await refetchCurrent();
            setOptimisticAutoRenewal(null);
        } catch (error) {
            setOptimisticAutoRenewal(previousValue);

        }
    }

    return {
        currentAutoRenewal,
        isUpdating,
        toggleAutoRenewal
    };
};