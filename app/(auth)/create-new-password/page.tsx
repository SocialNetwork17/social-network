import styles from "../../rootLayout.module.scss";
import {CreateNewPasswordPage} from "@/pages/auth/createNewPasswordPage/ui/CreateNewPasswordPage";

export default function Home() {
    return (
        <div className={styles.page}>
            <CreateNewPasswordPage/>
        </div>
    );
}
