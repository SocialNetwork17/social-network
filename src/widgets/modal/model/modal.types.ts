export type ModalStack = ModalState[]
export type ModalState =
    | { type: "NONE", payload: { description: string, title: string } }
    | LogOutModalType
    | RegistrationConfirmModalType
    | CreatePostModalType
    | CancelCreatePostModalType
    | EditPostModalType
    | OpenViewPostModalAC
    | DeletePostModalType


export type DeletePostModalType = ReturnType<typeof deletePostModalAC>
export type LogOutModalType = ReturnType<typeof logoutModalAC>
export type RegistrationConfirmModalType = ReturnType<typeof registrationConfirmModalAC>
export type CreatePostModalType = ReturnType<typeof createPostModalAC>
export type CancelCreatePostModalType = ReturnType<typeof cancelCreatePostModalAC>
export type EditPostModalType = ReturnType<typeof openEditPostModalAC> //🌱
export type OpenViewPostModalAC = ReturnType<typeof openViewPostModalAC> //🌱


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

export const openEditPostModalAC = (payload: { //🌱
    post: SchemaPostViewModel
}) => {
    return {type: 'EDIT_POST', payload} as const
}

export const openViewPostModalAC = (payload: { post: SchemaPostViewModel })  => { //🌱
    return {type: 'VIEW_POST', payload} as const
}