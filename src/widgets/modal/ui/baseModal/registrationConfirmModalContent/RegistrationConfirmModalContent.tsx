// @flow
import * as React from 'react';
import {RegistrationConfirmModalType} from "@/widgets/modal/model/modal.types";
import styles from "./RegistrationConfirmModalContent.module.scss"
import {Button} from "@/shared/ui/Button/Button";
import {useModal} from "@/widgets/modal/model/modal.context";

type Props = {
    modal: RegistrationConfirmModalType
};
export const RegistrationConfirmModalContent = (props: Props) => {
    const {modal} = props
    const {clearModals} = useModal()

    return (
        <>
            <p className={styles.description}>
                {modal.payload.description}
                <span className={styles.descriptionBold}>{modal.payload.email}</span>
            </p>
            <div className={styles.buttonsContainer}>
                <Button variant={"primary"}
                        disabled={false}
                        onClick={() => clearModals()}
                        width={96}
                        height={36}
                >
                    OK
                </Button>
            </div>
        </>
    );
};