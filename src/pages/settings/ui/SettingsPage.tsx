// @flow 
import * as React from 'react';
import {Tabs} from "@/shared/ui/Tabs/Tabs";
import styles from "./SettingsPage.module.scss"
import {TabsContent} from "@/pages/settings/ui/TabsContent/TabsContent";


export const SettingsPage = () => {
    return (
        <div className={styles.settingsContainer}>
            <Tabs/>
            <TabsContent/>
        </div>
    )
}