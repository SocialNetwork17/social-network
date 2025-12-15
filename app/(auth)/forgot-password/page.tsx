import styles from "../../rootLayout.module.scss";
import {ForgotPasswordPage} from "@/pages/forgotPasswordPage/ui/ForgotPasswordPage";

export default function Home() {
    return (
        <div className={styles.page}>
            <ForgotPasswordPage/>
        </div>
    );
}
