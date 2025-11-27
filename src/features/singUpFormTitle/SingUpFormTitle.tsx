import styles from "./SingUpFormTitle.module.scss"
import {IconButton} from "@/shared/ui/IconButton/IconButton";

type Props = {

};

export const SingUpFormTitle = (props: Props) => {

    return (
        <div className={styles.titleWrapper}>
            <div className={styles.title}>Sing Up</div>
            <div className={styles.iconContainer}>
                <IconButton iconId={"googleIcon"}
                            size={36}
                />
                <IconButton iconId={"githubIcon"}
                            size={36}
                />
            </div>
        </div>
    );
};