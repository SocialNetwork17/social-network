export type ModalStack = ModalState[]
export type ModalState =
    | LogOutModalType
    | RegistrationConfirmModalType
    | CreatePostModalType
    | CancelCreatePostModalType
    | DeletePostModalType
    | OpenViewPostModalAC
    | EditPostModalType
    | CancelEditPostModalType
    | UploadErrorModalType



export type DeletePostModalType = ReturnType<typeof deletePostModalAC>
export type LogOutModalType = ReturnType<typeof logoutModalAC>
export type RegistrationConfirmModalType = ReturnType<typeof registrationConfirmModalAC>
export type CreatePostModalType = ReturnType<typeof createPostModalAC>
export type CancelCreatePostModalType = ReturnType<typeof cancelCreatePostModalAC>
export type CancelEditPostModalType = ReturnType<typeof openCancelEditPostModalAC>
export type OpenViewPostModalAC = ReturnType<typeof openViewPostModalAC>
export type EditPostModalType = ReturnType<typeof openEditPostModalAC>
export type UploadErrorModalType = ReturnType<typeof uploadErrorModalAC>


export const logoutModalAC = (payload: { title: string, email: string, description: string }) => {
    return {type: 'CONFIRM_LOGOUT', payload: {...payload}} as const
}

export const deletePostModalAC = (payload: { title: string, description: string, postId: number }) => {
    return {type: 'DELETE_POST', payload: {...payload}} as const
}


export const registrationConfirmModalAC = (payload: { title: string, email: string, description: string }) => {
    return {type: 'CONFIRM_REGISTRATION', payload: {...payload}} as const
}


export const createPostModalAC = () => {
    return {type: 'CREATE_POST', payload: {title: '' as string}} as const
}

export const cancelCreatePostModalAC = (payload: { title: string, description: string }) => {
    return {type: 'CANCEL_CREATE_POST', payload: {...payload}} as const
}

export const openViewPostModalAC = (payload: { postId: number }) => ({
    type: 'VIEW_POST',
    payload: {...payload},
} as const)

export const openEditPostModalAC = (payload: { postId: number }) => ({
    type: 'EDIT_POST',
    payload: {...payload},
} as const)

export const openCancelEditPostModalAC = (payload: { title: string, description: string }) => ({
    type: 'CANCEL_EDIT_POST',
    payload: {...payload},
} as const)

export const uploadErrorModalAC = (payload: { title: string, description: string }) => ({
    type: 'UPLOAD_ERROR', payload} as const)

