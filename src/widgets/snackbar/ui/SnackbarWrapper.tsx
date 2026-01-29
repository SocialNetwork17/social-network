import styles from './SnackbarWrapper.module.scss'
import {useSnackbar} from "@/widgets/snackbar/model/snackbar.context";
import {BaseSnackbar} from "@/widgets/snackbar/ui/baseSnackbar/BaseSnackbar";

export const SnackbarWrapper = () => {
    const {stack} = useSnackbar()

    if (!stack.length) return null

    return (
        <div className={styles.container}>
            {stack.map((snackbar, index) => (
                <BaseSnackbar
                    index={index} // 🔥 Важно: используем id, а не index!
                    snackbar={snackbar}               />
            ))}
        </div>
    )
}