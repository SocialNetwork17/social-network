'use client'
import { createContext, useContext } from 'react'
import {SnackbarState} from './snackbar.types'

// Новый тип с id
export interface SnackbarWithId {
    id: string;
    data: SnackbarState;
}

type SnackbarContextValue = {
    stack: SnackbarWithId[]
    addSnackbar: (snackbar: SnackbarState) => void
    removeSnackbar: () => void
    removeSnackbarById: (id: string) => void
    clearSnackbars: () => void
    successSnackbar: (message: string) => void
    errorSnackbar: (message: string) => void
}

export const SnackbarContext = createContext<SnackbarContextValue | null>(null)

export const useSnackbar = () => {
    const ctx = useContext(SnackbarContext)
    if (!ctx) {
        throw new Error('useSnackbar must be used within SnackbarProvider')
    }
    return ctx
}