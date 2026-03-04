'use client'

import {
    CancelCreatePostModalType, CancelEditPostModalType, CreatePaymentModalType, DeleteAvatarModalType,
    DeletePostModalType, InfoModalType,
    LogOutModalType,
    RegistrationConfirmModalType, UploadAvatarModalType, UploadErrorModalType
} from "@/widgets/modal/model/modal.types";
import styles from './BaseModal.module.scss'
import {IconButton} from "@/shared/ui/IconButton/IconButton";
import {useModal} from "@/widgets/modal/model/modal.context";
import {LogoutModalContent} from "@/widgets/modal/ui/baseModal/logOutModalContent/LogoutModalContent";
import {ReactNode} from "react";
import {
    RegistrationConfirmModalContent
} from "@/widgets/modal/ui/baseModal/registrationConfirmModalContent/RegistrationConfirmModalContent";
import {
    CancelCreatePostModalContent
} from "@/widgets/modal/ui/baseModal/cancelCreatePostModalContent/CancelCreatePostModalContent";
import {
    CancelDeletePostModalContent
} from "@/widgets/modal/ui/baseModal/cancelDeletePostModalContent/CancelDeletePostModalContent";
import {
    CancelEditPostModalContent
} from "@/widgets/modal/ui/baseModal/candelEditPostModalContent/CancelEditPostModalContent";
import {UploadErrorModalContent} from "@/widgets/modal/ui/baseModal/uploadErrorModalContent/UploadErrorModalContent";
import {ProfilePhotoModal} from "@/features/editAvatar/ui/ProfilePhotoModal";
import {DeleteAvatarModalContent} from "@/widgets/modal/ui/baseModal/deleteAvatarModalContent/DeleteAvatarModalContent";
import {
    CreatePaymentModalContent
} from "@/widgets/modal/ui/baseModal/createPaymentModalContent/CreatePaymentModalContent";
import {InfoModalContent} from "@/widgets/modal/ui/baseModal/infoModalContent/InfoModalContent";

type Props = {
    modal: DeletePostModalType
        | RegistrationConfirmModalType
        | LogOutModalType
        | CancelCreatePostModalType
        | CancelEditPostModalType
        | UploadErrorModalType
        | UploadAvatarModalType
        | DeleteAvatarModalType
        | CreatePaymentModalType
        | InfoModalType
}

export const BaseModal = ({modal}: Props) => {

    const {stack, clearModals, popModal} = useModal()

    const currentContent = (): ReactNode | null => {
        switch (modal.type) {
            case "DELETE_POST":
                return <CancelDeletePostModalContent modal={modal} />
            case "CONFIRM_REGISTRATION":
                return <RegistrationConfirmModalContent modal={modal} />
            case "CONFIRM_LOGOUT":
                return <LogoutModalContent modal={modal} />
            case "CANCEL_CREATE_POST":
                return <CancelCreatePostModalContent modal={modal} />
            case "CANCEL_EDIT_POST":
                return <CancelEditPostModalContent modal={modal} />
            case 'UPLOAD_ERROR':
                return <UploadErrorModalContent modal={modal} />
            case 'UPLOAD_AVATAR':
                return <ProfilePhotoModal />
            case 'DELETE_AVATAR':
                return <DeleteAvatarModalContent modal={modal} />
            case "CREATE_PAYMENT":
                return <CreatePaymentModalContent modal={modal} />
            case "INFO":
                return <InfoModalContent modal={modal} />
            default:
                return null
        }
    }


    return(
        <div className={styles.modal}>
            <div className={styles.titleWrapper}>
                <div className={styles.title}>{modal.payload.title}</div>
                <IconButton iconId={'logoutBtnCloseSvg'} size={24} onClick={()=>stack.length > 1  ? popModal(): clearModals()} />
            </div>
            {currentContent()}
        </div>
    )
}



