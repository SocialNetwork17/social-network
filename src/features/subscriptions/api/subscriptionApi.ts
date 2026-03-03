'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { client } from '@/shared/api/client'
import type {components} from '@/shared/api/schema'

import {
    PaymentHistoryResponse,
    PaymentHistoryParams,
    CurrentSubscriptionResponse,
    SubscriptionCost,
} from '../types/subscription.types'

// Ключи для query
export const subscriptionKeys = {
    all: ['subscriptions'] as const,
    current: () => [...subscriptionKeys.all, 'current'] as const,
    costs: () => [...subscriptionKeys.all, 'costs'] as const,
    history: () => [...subscriptionKeys.all, 'history'] as const,
    historyWithParams: (pageNumber: number, pageSize: number) =>
        [...subscriptionKeys.all, 'history', pageNumber, pageSize] as const,
}

// Query хуки
export const useCurrentSubscription = () => {
    return useQuery({
        queryKey: subscriptionKeys.current(),
        queryFn: async () => {
            const { data, error } = await client.GET('/api/v1/subscriptions/current-payment-subscriptions')
            if (error) throw error
            return data as CurrentSubscriptionResponse
        },
    })
}

export const useSubscriptionCosts = () => {
    return useQuery({
        queryKey: subscriptionKeys.costs(),
        queryFn: async () => {
            const { data, error } = await client.GET('/api/v1/subscriptions/cost-of-payment-subscriptions')
            if (error) throw error
            return data?.data as SubscriptionCost[] || []
        },
    })
}

export const usePaymentHistory = (params?: PaymentHistoryParams) => {
    const pageNumber = params?.pageNumber ?? 1
    const pageSize = params?.pageSize ?? 12

    return useQuery({
        queryKey: subscriptionKeys.historyWithParams(pageNumber, pageSize),
        queryFn: async () => {
            const { data, error } = await client.GET('/api/v1/subscriptions/my-payments', {
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

// Mutation хуки
export const useCreateSubscription = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['create-subscription'],
        mutationFn: async (body: components['schemas']['CreateSubscriptionInputDto']) => {
            const { data, error } = await client.POST('/api/v1/subscriptions', {
                body: body,
            })

            if (error) throw error
            return data as components['schemas']['PaymentSessionUrlViewModel']
        },
        retry: 1,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: subscriptionKeys.current() })
            queryClient.invalidateQueries({ queryKey: subscriptionKeys.history() })
        },
    })
}

export const useCancelAutoRenewal = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['cancel-auto-renewal'],
        mutationFn: async () => {
            const { error } = await client.POST('/api/v1/subscriptions/canceled-auto-renewal')
            if (error) throw error
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: subscriptionKeys.current() })
        },
    })
}

export const useRenewAutoRenewal = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['renew-auto-renewal'],
        mutationFn: async () => {
            const { error } = await client.POST('/api/v1/subscriptions/renew-auto-renewal')
            if (error) throw error
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: subscriptionKeys.current() })
        },
    })
}