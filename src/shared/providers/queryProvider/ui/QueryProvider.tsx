'use client'

import dynamic from 'next/dynamic'
import {MutationCache, QueryCache, QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {useState} from 'react'
import {EmptyErrorResponse} from '@/shared/types/types'

const ReactQueryDevtools = dynamic(
  () => import('@tanstack/react-query-devtools').then(module => module.ReactQueryDevtools),
  { ssr: false }
)

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000,
            gcTime: 10 * 60 * 1000,
            refetchOnMount: true,
            refetchOnReconnect: true,
            refetchOnWindowFocus: true,
            retry: false,
          },
        },
        queryCache: new QueryCache({
          onError: (error: unknown) => {
            const err = error as EmptyErrorResponse
            if (err.type === 'general') {
              alert(`Global error: ${err.message}`)
            }
          },
        }),
        mutationCache: new MutationCache({
          onError: (error: unknown) => {
            const err = error as EmptyErrorResponse
            if (err.type === 'general') {
              alert(JSON.stringify(err))
            }
          },
        }),
      })
  )

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
