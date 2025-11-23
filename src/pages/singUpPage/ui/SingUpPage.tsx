import {SingUpForm} from "@/features/singUp/ui/SingUpForm";
import styles from "./SingUpPage.module.scss"

type Props = {

};
export const SingUpPage = (props: Props) => {
    return (
        <div className={styles.authPage}>
            <SingUpForm/>
        </div>
    );
};