'use client'

import styles from './BaseSnackbar.module.scss'
import {IconButton} from "@/shared/ui/IconButton/IconButton";
import {
    ErrorSnackbarType,
    InfoSnackbarType,
    SuccessSnackbarType,
    WarningSnackbarType
} from "@/widgets/snackbar/model/snackbar.types";
import {useSnackbar} from "@/widgets/snackbar/model/snackbar.context";

type Props = {
    snackbar: ErrorSnackbarType | SuccessSnackbarType | WarningSnackbarType | InfoSnackbarType
    index: number
}

export const BaseSnackbar = ({snackbar}: Props) => {

    const { removeSnackbar } = useSnackbar()

    const getSnackbarType  = () => {
        switch (snackbar.type) {
            case 'SUCCESS_SNACKBAR':
                return 'success'
            case 'ERROR_SNACKBAR':
                return 'error'
            case 'WARNING_SNACKBAR':
                return 'warning'
            case 'INFO_SNACKBAR':
                return 'info'
            default:
                return 'info'
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
                    fill="white" size={24}
                    onClick={removeSnackbar} />
            </div>
        </div>
    )
}



