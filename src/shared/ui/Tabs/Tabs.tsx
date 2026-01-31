'use client'

import styles from './Tabs.module.scss'
import {SettingsTab, SettingsTabs, TabsType} from "@/pages/settings/model/tabs.types";
import {useRouter, useSearchParams} from "next/navigation";
import {PATH} from "@/shared/constants/routings";

export const Tabs = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const currentPart = (searchParams?.get('part') as SettingsTab) ?? SettingsTabs.INFO

    const onClickHandler = (tabType: SettingsTab) => {
        const params = new URLSearchParams(searchParams?.toString())
        params.set('part', tabType)
        router.push(`${PATH.SETTINGS}?${params.toString()}`)
    }

    const tabs: TabsType = [
        {type: SettingsTabs.INFO, description: 'General information'},
        {type: SettingsTabs.DEVICES, description: 'Devices'},
        {type: SettingsTabs.SUBSCRIPTIONS, description: 'Account Management'},
        {type: SettingsTabs.PAYMENTS, description: 'My payments'},
    ]

    const tabClassActive = `${styles.tab} ${styles.primary}`
    const tabClassInActive = `${styles.tab} ${styles.secondary}`

    return (
        <div>
            <div style={{display: 'flex'}}>
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={currentPart === tab.type ? tabClassActive : tabClassInActive}
                        onClick={() => onClickHandler(tab.type)}
                    >
                        {tab.description}
                    </button>
                ))}
            </div>
        </div>
    )
}
