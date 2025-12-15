import styles from "../../rootLayout.module.scss";
import {CreateNewPasswordForm} from "@/features/createNewPassword/ui/CreateNewPasswordForm";
import {CreateNewPasswordPage} from "@/pages/createNewPasswordPage/ui/CreateNewPasswordPage";

export default function Home() {
    return (
        <div className={styles.page}>
            <CreateNewPasswordPage/>
        </div>
    );
}
