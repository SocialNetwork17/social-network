'use client'

import { useCallback } from 'react'
import {
    useCurrentSubscription,
    useSubscriptionCosts,
    usePaymentHistory,
    useCreateSubscription,
    useCancelAutoRenewal,
    useRenewAutoRenewal,
} from '../api/subscriptionApi'
import type { components } from '@/shared/api/schema'

type SubscriptionType = components['schemas']['CreateSubscriptionInputDto']['typeSubscription']
type PaymentType = components['schemas']['CreateSubscriptionInputDto']['paymentType']

export const useSubscriptions = () => {
    const currentSubscription = useCurrentSubscription()
    const subscriptionCosts = useSubscriptionCosts()
    const paymentHistory = usePaymentHistory()

    const createSubscriptionMutation = useCreateSubscription()
    const cancelAutoRenewalMutation = useCancelAutoRenewal()
    const renewAutoRenewalMutation = useRenewAutoRenewal()

    const handleCreateSubscription = useCallback(
        async (
            typeSubscription: SubscriptionType,
            paymentType: PaymentType,
            amount: number
        ) => {
            const baseUrl = window.location.href

            try {
                const result = await createSubscriptionMutation.mutateAsync({
                    typeSubscription,
                    paymentType,
                    amount,
                    baseUrl,
                })

                if (result.url) {
                    window.location.href = result.url
                }

                return result
            } catch (error) {
                console.error('Failed to create subscription:', error)
                throw error
            }
        },
        [createSubscriptionMutation]
    )

    const handleToggleAutoRenewal = useCallback(
        async (enable: boolean) => {
            try {
                if (enable) {
                    await renewAutoRenewalMutation.mutateAsync()
                } else {
                    await cancelAutoRenewalMutation.mutateAsync()
                }

                await currentSubscription.refetch()
            } catch (error) {
                console.error('Failed to toggle auto-renewal:', error)
                throw error
            }
        },
        [cancelAutoRenewalMutation, renewAutoRenewalMutation, currentSubscription]
    )

    const getCostByType = useCallback(
        (type: SubscriptionType) => {
            return subscriptionCosts.data?.find(cost => cost.typeDescription === type)?.amount || 0
        },
        [subscriptionCosts.data]
    )

    const hasActiveSubscription = currentSubscription.data?.data &&
        currentSubscription.data.data.length > 0
    const isBusinessAccount = hasActiveSubscription
    const currentSubscriptionData = currentSubscription.data?.data?.[0]

    return {
        // Данные
        currentSubscription: currentSubscription.data,
        currentSubscriptionData,
        subscriptionCosts: subscriptionCosts.data,
        paymentHistory: paymentHistory.data,

        // Состояния загрузки
        isLoading:
            currentSubscription.isLoading ||
            subscriptionCosts.isLoading ||
            paymentHistory.isLoading,
        isLoadingCurrent: currentSubscription.isLoading,
        isLoadingCosts: subscriptionCosts.isLoading,
        isLoadingHistory: paymentHistory.isLoading,
        isCreating: createSubscriptionMutation.isPending,
        isTogglingRenewal:
            cancelAutoRenewalMutation.isPending ||
            renewAutoRenewalMutation.isPending,

        // Флаги
        hasActiveSubscription,
        isBusinessAccount,
        hasAutoRenewal: currentSubscription.data?.hasAutoRenewal || false,

        // Ошибки
        currentError: currentSubscription.error,
        costsError: subscriptionCosts.error,
        historyError: paymentHistory.error,
        creationError: createSubscriptionMutation.error,

        // Действия
        handleCreateSubscription,
        handleToggleAutoRenewal,
        getCostByType,
        refetchCurrent: currentSubscription.refetch,
    }
}