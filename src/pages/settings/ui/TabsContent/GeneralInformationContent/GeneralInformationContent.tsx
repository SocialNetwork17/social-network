import styles from "./GeneralInformationContent.module.scss"
import {EditProfileForm} from "@/features/editProfile/ui/EditProfileForm";
import {Button} from "@/shared/ui/Button/Button";
import { openUploadAvatarModalAC } from "@/widgets/modal/model/modal.types";
import {useModal} from "@/widgets/modal/model/modal.context";
import {EditAvatar} from "@/features/editAvatar/ui/EditAvatar";

export const GeneralInformationContent = () => {

    return (
        <div className={styles.generalInformationContainer}>
            <EditAvatar/>
            <EditProfileForm/>
        </div>
    )
}