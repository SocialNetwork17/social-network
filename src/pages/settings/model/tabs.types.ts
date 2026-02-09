export const SettingsTabs = {
    INFO: 'info',
    DEVICES: 'devices',
    SUBSCRIPTIONS: 'subscriptions',
    PAYMENTS: 'payments',
} as const

export type SettingsTabType = typeof SettingsTabs[keyof typeof SettingsTabs]


export type TabsType = TabType[]

export type TabType = {
    type: SettingsTabType
    description: string
}

