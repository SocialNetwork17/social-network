'use client'

import {ModalState} from "@/widgets/modal/model/modal.types";
import styles from './BaseModal.module.scss'
import {IconButton} from "@/shared/ui/IconButton/IconButton";
import {useModal} from "@/widgets/modal/model/modal.context";
import {LogoutModalContent} from "@/widgets/modal/ui/baseModal/logOutModalContent/LogoutModalContent";
import {ReactNode} from "react";
import {RegistrationConfirmModalContent} from "@/widgets/modal/ui/baseModal/registrationConfirmModalContent/RegistrationConfirmModalContent";
import {
    CancelCreatePostModalContent
} from "@/widgets/modal/ui/baseModal/cancelCreatePostModalContent/CancelCreatePostModalContent";

type Props = {
    modal: ModalState
}

export const BaseModal = ({modal}: Props) => {

    const {clearModals, popModal} = useModal()

    const currentContent = (): ReactNode | null => {
        switch (modal.type) {
            case "CONFIRM_REGISTRATION":
                return <RegistrationConfirmModalContent modal={modal} />
            case "CONFIRM_LOGOUT":
                return <LogoutModalContent modal={modal} />
            case "CANCEL_CREATE_POST":
                return <CancelCreatePostModalContent modal={modal} />
            default:
                return null
        }
    }


    return(
        <div className={styles.modal}>
            <div className={styles.titleWrapper}>
                <div className={styles.title}>{modal.type !== "NONE" && modal.payload.title}</div>
                <IconButton iconId={'logoutBtnCloseSvg'} size={24} onClick={()=>modal.type === "CANCEL_CREATE_POST" ? popModal(): clearModals()} />
            </div>
            {currentContent()}
        </div>
    )
}



