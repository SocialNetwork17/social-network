export const SettingsTabs = {
    INFO: 'info',
    DEVICES: 'devices',
    SUBSCRIPTIONS: 'subscriptions',
    PAYMENTS: 'payments',
} as const

export type SettingsTab = typeof SettingsTabs[keyof typeof SettingsTabs]


export type TabsType = TabType[]

export type TabType = {
    type: SettingsTab
    description: string
}

