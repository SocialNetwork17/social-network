'use client'

import s from './Sidebar.module.scss'
import { Icon } from '@/shared/ui/Icon/Icon'
import { useState } from 'react'
import { LogOut } from '@/shared/ui/LogOut/LogOut'
import { useMeQuery } from '@/shared/api/useMeQuery'
import { menuItems } from '@/widgets/sidebar/ui/Sidebar.config'
import { SidebarLink } from '@/widgets/sidebar/ui/SidebarLink/SidebarLink'
import { useLogoutMutation } from '@/widgets/sidebar/api/useLogoutMutation'

export const Sidebar = () => {
  const mainItems = menuItems.slice(0, 5)
  const bottomItems = menuItems.slice(5)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const logoutMutation = useLogoutMutation()
  const { data } = useMeQuery()

  const handleLogout = () => {
    setIsLogoutModalOpen(true)
  }

  const handleLogoutConfirm = () => {
    logoutMutation.mutate()
  }

  const handleLogoutClose = () => {
    setIsLogoutModalOpen(false)
  }

  return (
    <>
      <aside className={s.sidebar}>
        <nav className={s.navSidebar}>
          <ul className={s.sidebarList}>
            {mainItems.map(item => (
              <SidebarLink
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                disabled={item.disabled}
              />
            ))}
          </ul>
          <div className={s.bottomSection}>
            <ul className={s.sidebarList}>
              {bottomItems.map(item => (
                <SidebarLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  disabled={item.disabled}
                />
              ))}
            </ul>

            <div className={s.logoutContainer}>
              <button className={`${s.sidebarLink} ${s.logoutButton}`} onClick={handleLogout}>
                <Icon iconId="logOut" size={24} className={s.sidebarIcon} />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </nav>
      </aside>

      {/* Компонент модального окна выхода */}
      <LogOut
        isOpen={isLogoutModalOpen}
        onConfirmAction={handleLogoutConfirm}
        onCloseAction={handleLogoutClose}
        email={data?.email}
      />
    </>
  )
}
