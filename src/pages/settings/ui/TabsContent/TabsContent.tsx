"use client"
import {useSearchParams} from "next/navigation";

import {GeneralInformationContent} from "@/pages/settings/ui/TabsContent/GeneralInformationContent/GeneralInformationContent";
import styles from "./TabsContent.module.scss"
import {
    AccountManagementContent
} from "@/pages/settings/ui/TabsContent/AccountManagementContent/AccountManagementContent";
import {MyPaymentsContent} from "@/pages/settings/ui/TabsContent/MyPaymentsContent/MyPaymentsContent"
import {SettingsTabs, SettingsTabType} from "@/pages/settings/model/tabs.types";


export const TabsContent = () => {

    const searchParams = useSearchParams()
    const currentTab = searchParams?.get('part') as SettingsTabType ?? SettingsTabs.INFO

    const currentContent = () => {
        switch (currentTab) {
            case "info":
                return <GeneralInformationContent/>
            case "subscriptions":
                return <AccountManagementContent/>
            case "payments":
                return <MyPaymentsContent/>
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