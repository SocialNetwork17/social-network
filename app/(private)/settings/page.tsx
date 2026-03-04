import {SettingsPage} from "@/pages/settings/ui/SettingsPage";
import {Suspense} from "react";
import {SettingsSkeleton} from "@/pages/settings/ui/SettingsSkeleton/SettingsSkeleton";


export default function Settings() {

    return (
        <>
            <Suspense fallback={<SettingsSkeleton/>}>
                <SettingsPage/>
            </Suspense>
        </>
    )
}