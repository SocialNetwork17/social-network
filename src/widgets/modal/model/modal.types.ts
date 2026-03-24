import {PaymentType, SubscriptionType} from "@/features/subscriptions/model/subscription.types";

export type ModalStack = ModalState[]
export type ModalState =
    | LogOutModalType
    | RegistrationConfirmModalType
    | CreatePostModalType
    | CancelCreatePostModalType
    | DeletePostModalType
    | CancelEditPostModalType
    | UploadErrorModalType
    | UploadAvatarModalType
    | DeleteAvatarModalType
    | CreatePaymentModalType
    | InfoModalType


export type DeletePostModalType = ReturnType<typeof deletePostModalAC>
export type LogOutModalType = ReturnType<typeof logoutModalAC>
export type RegistrationConfirmModalType = ReturnType<typeof registrationConfirmModalAC>
export type CreatePostModalType = ReturnType<typeof createPostModalAC>
export type CancelCreatePostModalType = ReturnType<typeof cancelCreatePostModalAC>
export type CancelEditPostModalType = ReturnType<typeof openCancelEditPostModalAC>
export type UploadErrorModalType = ReturnType<typeof uploadErrorModalAC>
export type UploadAvatarModalType = ReturnType<typeof openUploadAvatarModalAC>
export type DeleteAvatarModalType = ReturnType<typeof deleteAvatarModalAC>
export type CreatePaymentModalType = ReturnType<typeof createPaymentModalAC>
export type InfoModalType = ReturnType<typeof infoModalAC>


export const logoutModalAC = (payload: { title: string, email: string, description: string }) => {
    return {type: 'CONFIRM_LOGOUT', payload} as const
}

export const deletePostModalAC = (payload: { title: string, description: string, postId: number }) => {
    return {type: 'DELETE_POST', payload} as const
}

// todo - переделать на payload
export const registrationConfirmModalAC = (payload: { title: string, email: string, description: string }) => {
    return {type: 'CONFIRM_REGISTRATION', payload} as const
}


export const createPostModalAC = () => {
    return {type: 'CREATE_POST', payload: {title: '' as string}} as const
}

export const cancelCreatePostModalAC = (payload: { title: string, description: string }) => {
    return {type: 'CANCEL_CREATE_POST', payload} as const
}

export const openCancelEditPostModalAC = (payload: { title: string, description: string, onConfirm: () => void }) => {
    return {type: 'CANCEL_EDIT_POST', payload} as const
}

export const uploadErrorModalAC = (payload: { title: string, description: string }) => {
    return {type: 'UPLOAD_ERROR', payload} as const
}

export const openUploadAvatarModalAC = (payload: { title: string }) => {
    return {type: 'UPLOAD_AVATAR', payload} as const
}

export const deleteAvatarModalAC = (payload: { title: string; description: string }) => {
    return {type: 'DELETE_AVATAR', payload} as const
}

export const createPaymentModalAC = (payload: {
    title: string,
    description: string,
    paymentType: PaymentType,
    typeSubscription: SubscriptionType
}) => {
    return {type: 'CREATE_PAYMENT', payload} as const
}

export const infoModalAC = (payload: { title: string, description: string, buttonTitle: string }) => {
    return {type: 'INFO', payload} as const
}

