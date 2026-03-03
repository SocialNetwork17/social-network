import { components } from '@/shared/api/schema'

// Типы из схемы
export type PaymentHistoryItem = components['schemas']['PaymentsViewModel']
export type SubscriptionType = components['schemas']['CreateSubscriptionInputDto']['typeSubscription']
export type PaymentType = components['schemas']['CreateSubscriptionInputDto']['paymentType']
export type CurrentSubscriptionResponse = components['schemas']['CurrentActiveSubscriptionsViewModel']
export type SubscriptionCost = components['schemas']['PricingDetailsViewModel']

// Тип для ответа с пагинацией
export type PaymentHistoryResponse = {
    totalCount: number
    pagesCount: number
    page: number
    pageSize: number
    items: PaymentHistoryItem[]
}

// Параметры запроса (исправлено: используем query, а не params)
export type PaymentHistoryParams = {
    pageNumber?: number
    pageSize?: number
    sortBy?: string
    sortDirection?: 'asc' | 'desc'
}
