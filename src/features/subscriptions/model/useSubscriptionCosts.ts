import {useQuery} from "@tanstack/react-query";
import {client} from "@/shared/api/client";
import {SubscriptionCost} from "@/features/subscriptions/model/subscription.types";

export const useSubscriptionCosts = () => {
    return useQuery({
        queryKey: ['subscription costs'],
        queryFn: async () => {
            const {data, error} = await client.GET('/api/v1/subscriptions/cost-of-payment-subscriptions')
            if (error) throw error
            return data?.data as SubscriptionCost[] || []
        },
    })
}