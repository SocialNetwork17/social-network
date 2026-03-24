// @flow
import * as React from 'react';
import styles from "./InfoModalContent.module.scss"
import {InfoModalType} from "@/widgets/modal/model/modal.types";
import {Button} from "@/shared/ui/Button/Button";
import {useModal} from "@/widgets/modal/model/modal.context";


type Props = {
    modal: InfoModalType
}

export const InfoModalContent = ({modal}: Props) => {

    const {clearModals} = useModal()

    const handleClose = () => {
        clearModals()
    };

    return (
        <div className={styles.infoModalWrapper}>
            <p className={styles.description}>{modal.payload.description}</p>
            <div className={styles.buttonsContainer}>
                <Button variant={'primary'}
                        width={108}
                        height={36}
                        disabled={false}
                        onClick={handleClose}
                >
                    {modal.payload.buttonTitle}
                </Button>
            </div>
        </div>
    )
}