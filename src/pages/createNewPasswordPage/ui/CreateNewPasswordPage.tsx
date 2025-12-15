import styles from './CreateNewPasswordPage.module.scss'
import {CreateNewPasswordForm} from "@/features/createNewPassword/ui/CreateNewPasswordForm";

type Props = {};

export const CreateNewPasswordPage = (props: Props) => {
    return (
        <div className={styles.authPage}>
            <CreateNewPasswordForm/>
        </div>
    );
};