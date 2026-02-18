'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { client } from '@/shared/api/client'
import type {components} from '@/shared/api/schema'

// Типы из сгенерированной схемы
export type SubscriptionType = components['schemas']['CreateSubscriptionInputDto']['typeSubscription']
export type PaymentType = components['schemas']['CreateSubscriptionInputDto']['paymentType']
export type CurrentSubscription = components['schemas']['ActiveSubscriptionViewModel']
export type CurrentSubscriptionResponse = components['schemas']['CurrentActiveSubscriptionsViewModel']
export type PaymentHistoryItem = components['schemas']['PaymentsViewModel']
export type SubscriptionCost = components['schemas']['PricingDetailsViewModel']

// Ключи для query
export const subscriptionKeys = {
    all: ['subscriptions'] as const,
    current: () => [...subscriptionKeys.all, 'current'] as const,
    costs: () => [...subscriptionKeys.all, 'costs'] as const,
    history: () => [...subscriptionKeys.all, 'history'] as const,
}

// Query хуки
export const useCurrentSubscription = () => {
    return useQuery({
        queryKey: subscriptionKeys.current(),
        queryFn: async () => {
            const { data, error } = await client.GET('/api/v1/subscriptions/current-payment-subscriptions')

            if (error) {
                throw error
            }

            return data as CurrentSubscriptionResponse
        },
    })
}

export const useSubscriptionCosts = () => {
    return useQuery({
        queryKey: subscriptionKeys.costs(),
        queryFn: async () => {
            const { data, error } = await client.GET('/api/v1/subscriptions/cost-of-payment-subscriptions')

            if (error) {
                throw error
            }

            return data?.data as SubscriptionCost[] || []
        },
    })
}

export const usePaymentHistory = () => {
    return useQuery({
        queryKey: subscriptionKeys.history(),
        queryFn: async () => {
            const { data, error } = await client.GET('/api/v1/subscriptions/my-payments')

            if (error) {
                throw error
            }

            return data as PaymentHistoryItem[]
        },
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

            if (error) {
                throw error
            }

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

            if (error) {
                throw error
            }
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

            if (error) {
                throw error
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: subscriptionKeys.current() })
        },
    })
}