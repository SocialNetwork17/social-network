import styles from "./AuthFormTitle.module.scss"
import {IconButton} from "@/shared/ui/IconButton/IconButton";

type Props = {

};

export const AuthFormTitle = (props: Props) => {
    return (
        <div className={styles.titleWrapper}>
            <div className={styles.title}>Sing Up</div>
            <div className={styles.iconContainer}>
                <IconButton iconId={"googleIcon"}
                            width={"36"}
                            height={"36"}
                />
                <IconButton iconId={"githubIcon"}
                            width={"36"}
                            height={"36"}
                />
            </div>
        </div>
    );
};