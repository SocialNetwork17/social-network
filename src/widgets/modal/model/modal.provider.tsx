import {ModalWrapper} from "@/widgets/modal/ui/ModalWrapper";
import {ModalState} from "@/widgets/modal/model/modal.types";
import {useState} from "react";
import { ModalContext } from "./modal.context";

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [stack, setStack] = useState<ModalState[]>([])

    const pushModal = (modal: ModalState) => {
        setStack(prev => [...prev, modal])
    }

    const popModal = () => {
        setStack(prev => prev.slice(0, -1))
    }

    const clearModals = () => {
        setStack([])
    }

    return (
        <ModalContext.Provider
            value={{
                stack,
                pushModal,
                popModal,
                clearModals,
            }}
        >
            {children}
            <ModalWrapper/>
        </ModalContext.Provider>
    )
}