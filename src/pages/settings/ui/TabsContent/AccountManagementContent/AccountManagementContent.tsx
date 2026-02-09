import styles from "./AccountManagementContent.module.scss"
import {EditProfileForm} from "@/features/editProfile/ui/EditProfileForm";

import {EditAvatar} from "@/features/editAvatar/ui/EditAvatar";

export const AccountManagementContent = () => {

    return (
        <div className={styles.accountManagementContainer}>
            <EditAvatar/>
            <EditProfileForm/>
        </div>
    )
}