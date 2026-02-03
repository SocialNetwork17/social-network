import {useState} from "react";
import { SnackbarContext } from "./snackbar.context";
import {SnackbarState} from "@/widgets/snackbar/model/snackbar.types";
import {SnackbarWrapper} from "@/widgets/snackbar/ui/SnackbarWrapper";

export const SnackbarProvider = ({ children }: { children: React.ReactNode }) => {
    const [stack, setStack] = useState<SnackbarState[]>([])

    const addSnackbar = (snackbar: SnackbarState) => {
        setStack(prev => [...prev, snackbar])
    }

    const removeSnackbar = () => {
        setStack(prev => prev.slice(0, -1))
    }

    const clearSnackbars = () => {
        setStack([])
    }

    const successSnackbar = (message: string) => {
        addSnackbar({
            type: 'SUCCESS_SNACKBAR',
            payload: {message}
        })
    }

    const errorSnackbar = (message: string) => {
        addSnackbar({
            type: 'ERROR_SNACKBAR',
            payload: {message}
        })
    }

    const warningSnackbar = (message: string) => {
        addSnackbar({
            type: 'WARNING_SNACKBAR',
            payload: {message}
        })
    }

    const infoSnackbar = (message: string) => {
        addSnackbar({
            type: 'INFO_SNACKBAR',
            payload: {message}
        })
    }

    return (
        <SnackbarContext.Provider
            value={{
                stack,
                addSnackbar,
                removeSnackbar,
                clearSnackbars,
                successSnackbar,
                errorSnackbar,
                warningSnackbar,
                infoSnackbar,
            }}
        >
            {children}
            <SnackbarWrapper/>
        </SnackbarContext.Provider>
    )
}