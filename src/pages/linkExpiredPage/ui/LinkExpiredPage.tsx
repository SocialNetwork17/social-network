import styles from "./LinkExpiredPage.module.scss"
import {Input} from "@/shared/ui/Input/Input";


export const LinkExpiredPage = () => {


    return (
        <div className={styles.linkExpiredPage}>
            <div className={styles.title}>
                Email verification link expired
            </div>
            <div className={styles.description}>
                Looks like the verification link has expired. Not to worry, we can send the link again
            </div>
            <form className={styles.inputContainer}>
                <Input
                    label={"Email"}
                    type={"email"}
                    placeholder={"Epam@epam.com"}
                    required={false}
                />
            </form>
        </div>
    );
};