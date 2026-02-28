import {SettingsPage} from "@/pages/settings/ui/SettingsPage";
import {Suspense} from "react";


export default function Settings() {

    return (
        <>
            <Suspense fallback={<div>Loading settings...</div>}>
                <SettingsPage/>
            </Suspense>
        </>
    )
}