'use client'
import { createContext, useContext } from 'react'
import {SnackbarStack, SnackbarState} from './snackbar.types'

type SnackbarContextValue = {
    stack: SnackbarStack
    addSnackbar: (snackbar: SnackbarState) => void
    removeSnackbar: () => void
    clearSnackbars: () => void

    // Вспомогательные методы для быстрого использования
    successSnackbar: (message: string) => void
    errorSnackbar: (message: string) => void
    warningSnackbar: (message: string) => void
    infoSnackbar: (message: string) => void
}

export const SnackbarContext = createContext<SnackbarContextValue | null>(null)

export const useSnackbar = () => {
    const ctx = useContext(SnackbarContext)
    if (!ctx) {
        throw new Error('useSnackbar must be used within SnackbarProvider')
    }
    return ctx
}