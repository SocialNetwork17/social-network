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

    const success = (message: string) => {
        addSnackbar({
            type: 'SUCCESS_SNACKBAR',
            payload: {message}
        })
    }

    const error = (message: string) => {
        addSnackbar({
            type: 'ERROR_SNACKBAR',
            payload: {message}
        })
    }

    const warning = (message: string) => {
        addSnackbar({
            type: 'WARNING_SNACKBAR',
            payload: {message}
        })
    }

    const info = (message: string) => {
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
                success,
                error,
                warning,
                info,
            }}
        >
            {children}
            <SnackbarWrapper/>
        </SnackbarContext.Provider>
    )
}