// @flow
import * as React from 'react';
import styles from "../cancelDeletePostModalContent/CancelDeletePostModalContent.module.scss"
import {CancelEditPostModalType} from "@/widgets/modal/model/modal.types";
import {Button} from "@/shared/ui/Button/Button";
import {useModal} from "@/widgets/modal/model/modal.context";


type Props = {
    modal: CancelEditPostModalType
}

export const CancelEditPostModalContent = ({modal}: Props) => {

    const {popModal} = useModal()

    const handleClick = () => {
        popModal()
        modal.payload.onConfirm()
    }

    return (
        <>
            <p className={styles.description}>{modal.payload.description}</p>
            <div className={styles.buttonsContainer}>
                <Button variant={'outline'}
                        width={108}
                        height={36}
                        disabled={false}
                        onClick={handleClick}
                >
                    Yes
                </Button>
                <Button variant={'primary'}
                        width={108}
                        height={36}
                        disabled={false}
                        onClick={popModal}
                >
                    No
                </Button>
            </div>
        </>
    )
}