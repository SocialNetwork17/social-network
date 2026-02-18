import styles from './SnackbarWrapper.module.scss'
import {useSnackbar} from "@/widgets/snackbar/model/snackbar.context";
import {BaseSnackbar} from "@/widgets/snackbar/ui/baseSnackbar/BaseSnackbar";

export const SnackbarWrapper = () => {
    const {stack, removeSnackbarById} = useSnackbar()

    if (!stack.length) return null

    return (
        <div className={styles.container}>
            {stack.map((snackbarWithId) => (
                <BaseSnackbar
                    key={snackbarWithId.id}
                    snackbar={snackbarWithId.data}
                    onClose={() => removeSnackbarById(snackbarWithId.id)}
                />
            ))}
        </div>
    )
}