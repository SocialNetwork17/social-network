import styles from "./GeneralInformationContent.module.scss"
import {EditProfileForm} from "@/features/editProfile/ui/EditProfileForm";

export const GeneralInformationContent = () => {

    return (
        <div className={styles.generalInformationContainer}>
            <div className={styles.setAvatar}>AVAtar</div>
            <EditProfileForm/>
        </div>
    )
}