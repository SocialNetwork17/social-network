import styles from "./GeneralInformationContent.module.scss"
import {EditAvatar} from "@/features/editAvatar/ui/EditAvatar";
import {UpdateProfileInformationForm} from "@/features/editProfile/ui/UpdateProfileInformationForm";
import {useDataMyProfileQuery} from "@/pages/profile/api/useDataMyProfileQuery";
import {SettingsSkeleton} from "@/pages/settings/ui/SettingsSkeleton/SettingsSkeleton";

export const GeneralInformationContent = () => {

    const {data, isLoading} = useDataMyProfileQuery()

    if (isLoading) {
        return <SettingsSkeleton/>
    }

    return (
        <div className={styles.generalInformationContainer}>
            <EditAvatar/>
            <UpdateProfileInformationForm profileData={data!}/>
        </div>
    )
}