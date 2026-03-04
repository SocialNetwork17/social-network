// Mutation хуки
import {useMutation, useQueryClient} from "@tanstack/react-query";
import type {components} from "@/shared/api/schema";
import {client} from "@/shared/api/client";

export const useCreateSubscription = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['create-subscription'],
        mutationFn: async (body: components['schemas']['CreateSubscriptionInputDto']) => {
            const {data, error} = await client.POST('/api/v1/subscriptions', {
                body: body,
            })

            if (error) throw error
            return data as components['schemas']['PaymentSessionUrlViewModel']
        },
        retry: 1,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['current subscription']})
            queryClient.invalidateQueries({queryKey: ['payment history']})
        },
    })
}