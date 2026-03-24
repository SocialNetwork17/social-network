import {useMutation, useQueryClient} from "@tanstack/react-query";
import {client} from "@/shared/api/client";

export const useCancelAutoRenewal = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['cancel-auto-renewal'],
        mutationFn: async () => {
            const {error} = await client.POST('/api/v1/subscriptions/canceled-auto-renewal')
            if (error) throw error
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['current subscription']})
        },
    })
}