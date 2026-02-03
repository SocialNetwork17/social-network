'use client'

import styles from './BaseSnackbar.module.scss'
import {IconButton} from "@/shared/ui/IconButton/IconButton";
import {
    ErrorSnackbarType,
    SuccessSnackbarType,

} from "@/widgets/snackbar/model/snackbar.types";

type Props = {
    snackbar: ErrorSnackbarType | SuccessSnackbarType
    onClose: () => void
}

export const BaseSnackbar = ({snackbar, onClose}: Props) => {
    const getSnackbarType = () => {
        switch (snackbar.type) {
            case 'SUCCESS_SNACKBAR':
                return 'success'
            case 'ERROR_SNACKBAR':
                return 'error'
            default:
                return 'error'
        }
    }

    return(
        <div className={`${styles.snackbar} ${styles[getSnackbarType()]}`}>
            <div className={styles.snackbarContent}>
                <span className={styles.snackbarMessage}>
                    {getSnackbarType() === 'error' ? <b>Error! </b> : ''}{snackbar.payload.message}
                </span>
            </div>
            <div className={styles.snackbarClose}>
                <IconButton
                    iconId={'logoutBtnCloseSvg'}
                    fill="white"
                    size={24}
                    onClick={onClose}
                />
            </div>
        </div>
    )
}



