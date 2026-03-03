import {PaymentHistoryParams, PaymentHistoryResponse} from "@/features/subscriptions/model/subscription.types";
import {useQuery} from "@tanstack/react-query";
import {client} from "@/shared/api/client";

export const usePaymentHistory = (params?: PaymentHistoryParams) => {
    const pageNumber = params?.pageNumber ?? 1
    const pageSize = params?.pageSize ?? 12

    return useQuery({
        queryKey: ['payment history', pageNumber, pageSize],
        queryFn: async () => {
            const {data, error} = await client.GET('/api/v1/subscriptions/my-payments', {
                params: {
                    query: {
                        pageNumber,
                        pageSize,
                        sortBy: params?.sortBy,
                        sortDirection: params?.sortDirection,
                    }
                }
            })

            if (error) throw error
            return data as PaymentHistoryResponse
        },
        placeholderData: (previousData) => previousData,
    })
}