'use client'

import React from 'react'
import s from './Sidebar.module.scss'
import { Icon } from '@/shared/ui/Icon/Icon'


interface Props {
    mainItems?: React.ReactNode
    bottomItems?: React.ReactNode
    showLogout?: boolean
    onLogout?: () => void
    logoutState?: 'default' | 'hover'
}

export const SidebarUI = ({
                              mainItems,
                              bottomItems,
                              showLogout = true,
                              onLogout,
                              logoutState = 'default'
                          }: Props) => {
    return (
        <aside className={s.sidebar}>
            <nav className={s.navSidebar}>
                {/* Основные ссылки */}
                <ul className={s.sidebarList}>
                    {mainItems}
                </ul>

                {/* Нижняя секция */}
                <div className={s.bottomSection}>
                    {/* Дополнительные ссылки */}
                    {bottomItems && (
                        <ul className={s.sidebarList}>
                            {bottomItems}
                        </ul>
                    )}

                    {/* Кнопка выхода */}
                    {showLogout && (
                        <div className={s.logoutContainer}>
                            <button
                                className={`${s.sidebarLink} ${s.logoutButton}`}
                                onClick={onLogout}
                                style={logoutState === 'hover' ? {
                                    color: '#397df6',
                                    transform: 'translateX(4px)'
                                } : {}}
                            >
                                <Icon iconId="logOut" size={24} className={s.sidebarIcon} />
                                <span>Log Out {logoutState !== 'default' && `(${logoutState})`}</span>
                            </button>
                        </div>
                    )}
                </div>
            </nav>
        </aside>
    )
}