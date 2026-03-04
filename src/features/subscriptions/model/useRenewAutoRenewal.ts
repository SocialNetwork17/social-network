import {useMutation, useQueryClient} from "@tanstack/react-query";
import {client} from "@/shared/api/client";

export const useRenewAutoRenewal = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['renew-auto-renewal'],
        mutationFn: async () => {
            const {error} = await client.POST('/api/v1/subscriptions/renew-auto-renewal')
            if (error) throw error
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['current subscription']})
        },
    })
}