export type SnackbarStack = SnackbarState[]

export type SnackbarState =
    | ErrorSnackbarType
    | SuccessSnackbarType


export type SuccessSnackbarType = ReturnType<typeof successSnackbarAC> & { id?: string }
export type ErrorSnackbarType = ReturnType<typeof errorSnackbarAC> & { id?: string }


export const successSnackbarAC = (payload: {message: string; id?: string}) => {
    return {
        type: 'SUCCESS_SNACKBAR' as const,
        payload: {...payload}
    }
}

export const errorSnackbarAC = (payload: {message: string; id?: string}) => {
    return {
        type: 'ERROR_SNACKBAR' as const,
        payload: {...payload}
    }
}