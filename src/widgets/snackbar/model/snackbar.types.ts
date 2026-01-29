export type SnackbarStack = SnackbarState[]

export type SnackbarState =
    | ErrorSnackbarType
    | SuccessSnackbarType
    | WarningSnackbarType
    | InfoSnackbarType

export type SuccessSnackbarType = ReturnType<typeof successSnackbarAC>
export type ErrorSnackbarType = ReturnType<typeof errorSnackbarAC>
export type WarningSnackbarType = ReturnType<typeof warningSnackbarAC>
export type InfoSnackbarType = ReturnType<typeof infoSnackbarAC>

export const successSnackbarAC = (payload: {message: string}) => {
    return {type: 'SUCCESS_SNACKBAR', payload: {...payload}} as const
}

export const errorSnackbarAC = (payload: {message: string}) => {
    return {type: 'ERROR_SNACKBAR', payload: {...payload}} as const
}

export const warningSnackbarAC = (payload: {message: string}) => {
    return {type: 'WARNING_SNACKBAR', payload: {...payload}} as const
}

export const infoSnackbarAC = (payload: {message: string}) => {
    return {type: 'INFO_SNACKBAR', payload: {...payload}} as const
}






