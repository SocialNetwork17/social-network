// @flow
import * as React from 'react';
import styles from "../cancelDeletePostModalContent/CancelDeletePostModalContent.module.scss"
import {CancelEditPostModalType} from "@/widgets/modal/model/modal.types";
import {Button} from "@/shared/ui/Button/Button";
import {useModal} from "@/widgets/modal/model/modal.context";
import {useDeletePostIdFromUrl} from "@/shared/hooks/useDeletePostIdFromUrl";


type Props = {
    modal: CancelEditPostModalType
}

export const CancelEditPostModalContent = ({modal}: Props) => {
    const {clearModals, popModal} = useModal()
    const {deletePostIdFromUrl} = useDeletePostIdFromUrl()

    const handleClick = () => {
        clearModals()
        deletePostIdFromUrl()
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
                    YES
                </Button>
                <Button variant={'primary'}
                        width={108}
                        height={36}
                        disabled={false}
                        onClick={popModal}
                >
                    NO
                </Button>
            </div>
        </>
    )
}