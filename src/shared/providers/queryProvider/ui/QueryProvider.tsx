'use client'

import {MutationCache, QueryCache, QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {useState} from 'react'
import {EmptyErrorResponse, ServerError} from "@/shared/types/types";

export function QueryProvider({children}: { children: React.ReactNode }) {
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
                    }
                },
                queryCache: new QueryCache({
                    onError: (error: unknown) => {
                        const err = error as EmptyErrorResponse;
                        if (err.type === "general") {
                            alert(`Global error: ${err.message}`);
                        }
                    }
                }),
                mutationCache: new MutationCache({
                    onError: (error: unknown) => {
                        const err = error as EmptyErrorResponse;
                        if (err.type === "general") {
                            alert(JSON.stringify(err));
                        }
                    }
                })
            })
    )

    return (
        <QueryClientProvider client={client}>
            {children}
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    )
}
