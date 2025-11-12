'use client'

import s from './Sidebar.module.scss'
import { SidebarLink } from './SidebarLink/SidebarLink'
import { Icon } from '@/shared/ui/Icon/Icon'
import {menuItems} from "@/widgets/Sidebar/ui/Sidebar.config";
import React from "react";


export const Sidebar = () => {
  const mainItems = menuItems.slice(0, 5)
  const bottomItems = menuItems.slice(5)

  const handleLogout = () => {
    alert('Logout clicked')
  }

  return (
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
                <Icon iconId={"logOut"}/>
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </nav>
      </aside>
  )
}
