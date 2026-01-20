import { createContext, useContext } from 'react'
import {ModalStack, ModalState} from './modal.types'

type ModalContextValue = {
    stack: ModalStack
    pushModal: (modal: ModalState) => void
    popModal: () => void
    clearModals: () => void
}

export const ModalContext = createContext<ModalContextValue | null>(null)

export const useModal = () => {
    const ctx = useContext(ModalContext)
    if (!ctx) {
        throw new Error('useModal must be used within ModalProvider')
    }
    return ctx
}