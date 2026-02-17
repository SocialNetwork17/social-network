import styles from "./GeneralInformationContent.module.scss"
import {EditAvatar} from "@/features/editAvatar/ui/EditAvatar";
import {UpdateProfileInformationForm} from "@/features/editProfile/ui/UpdateProfileInformationForm";
import {useDataMyProfileQuery} from "@/pages/profile/api/useDataMyProfileQuery";

export const GeneralInformationContent = () => {

    const {data, isLoading} = useDataMyProfileQuery()

    if (!data) return

    return (
        <div className={styles.generalInformationContainer}>
            <EditAvatar/>
            <UpdateProfileInformationForm profileData={data}/>
        </div>
    )
}