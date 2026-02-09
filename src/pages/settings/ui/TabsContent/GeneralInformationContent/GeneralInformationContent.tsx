import styles from "./GeneralInformationContent.module.scss"
import {UpdateProfileInformationForm} from "@/features/editProfile/ui/UpdateProfileInformationForm";

export const GeneralInformationContent = () => {

    return (
        <div className={styles.generalInformationContainer}>
            <div className={styles.setAvatar}>AVAtar</div>
            <UpdateProfileInformationForm/>
        </div>
    )
}