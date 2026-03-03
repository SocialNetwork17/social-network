// Query хуки
import {useQuery} from "@tanstack/react-query";
import {client} from "@/shared/api/client";
import {CurrentSubscriptionResponse} from "@/features/subscriptions/model/subscription.types";

export const useCurrentSubscription = () => {
    return useQuery({
        queryKey: ['subscriptions'],
        queryFn: async () => {
            const {data, error} = await client.GET('/api/v1/subscriptions/current-payment-subscriptions')
            if (error) throw error
            return data as CurrentSubscriptionResponse
        },
    })
}