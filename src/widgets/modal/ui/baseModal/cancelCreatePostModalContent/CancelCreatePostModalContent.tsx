// @flow
import * as React from 'react';
import styles from "./CancelCreatePostModalContent.module.scss"
import {CancelCreatePostModalType} from "@/widgets/modal/model/modal.types";
import {Button} from "@/shared/ui/Button/Button";
import {useModal} from "@/widgets/modal/model/modal.context";


type Props = {
    modal: CancelCreatePostModalType
}

export const CancelCreatePostModalContent = ({modal}: Props) => {
    const {popModal, clearModals} = useModal()

    return (
        <>
            <p className={styles.description}>{modal.payload.description}</p>
            <div className={styles.buttonsContainer}>
                <Button variant={'outline'}
                        width={108}
                        height={36}
                        disabled={false}
                        onClick={popModal}
                >
                    Discard
                </Button>
                <Button variant={'primary'}
                        width={108}
                        height={36}
                        disabled={false}
                        onClick={clearModals}
                >
                    Yes, Close
                </Button>
            </div>
        </>
    )
}