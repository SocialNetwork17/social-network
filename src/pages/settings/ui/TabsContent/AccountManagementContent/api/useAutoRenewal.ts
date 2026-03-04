import { useState } from 'react';
import { useSubscriptions } from "@/features/subscriptions/hooks/useSubscriptions";
import {useCurrentSubscription} from "@/features/subscriptions/model/useCurrentSubscription";
import {useCancelAutoRenewal} from "@/features/subscriptions/model/useCancelAutoRenewal";
import {useRenewAutoRenewal} from "@/features/subscriptions/model/useRenewAutoRenewal";

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