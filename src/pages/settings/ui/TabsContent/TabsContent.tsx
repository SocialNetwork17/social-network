"use client"
import {useSearchParams} from "next/navigation";

import {GeneralInformationContent} from "@/pages/settings/ui/TabsContent/GeneralInformationContent/GeneralInformationContent";
import styles from "./TabsContent.module.scss"
import {SettingsTabs, SettingsTabType} from "@/pages/settings/model/tabs.types";


export const TabsContent = () => {

    const searchParams = useSearchParams()
    const currentTab = searchParams?.get('part') as SettingsTabType ?? SettingsTabs.INFO

    const currentContent = () => {
        switch (currentTab) {
            case "info":
                return <GeneralInformationContent/>
            default:
                return <GeneralInformationContent/>
        }
    }

    return (
        <div className={styles.tabsContentContainer}>
            {currentContent()}
        </div>
    )
}