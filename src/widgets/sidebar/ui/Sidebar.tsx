'use client'

import s from './Sidebar.module.scss'
import { SidebarLink } from './SidebarLink/SidebarLink'
import { Icon } from '@/shared/ui/Icon/Icon'
import { menuItems } from '@/widgets/Sidebar/ui/Sidebar.config'
import { useState } from 'react'
import { LogOut } from '@/shared/ui/LogOut/LogOut'
import { useLogoutMutation } from '@/features/auth/api/useLogoutMutation'
import { useMeQuery } from '@/features/auth/api/useMeQuery'
import { Path } from './Sidebar.config'
import {CreatePostModal} from "@/entites/posts/createPost/ui/CreatePostModal";

export const Sidebar = () => {
  const mainItems = menuItems.slice(0, 5)
  const bottomItems = menuItems.slice(5)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  const [isCreateOpen, setIsCreateOpen] = useState(false)

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
            {mainItems.map(item => {
              if (item.href === Path.Create) {
                return (
                    <SidebarLink
                        key={item.href}
                        href="#"
                        label={item.label}
                        icon={item.icon}
                        disabled={item.disabled}
                        onClick={(e) => { e?.preventDefault(); setIsCreateOpen(true) }}
                    />
                )
              }
              return (
                  <SidebarLink
                      key={item.href}
                      href={item.href}
                      label={item.label}
                      icon={item.icon}
                      disabled={item.disabled}
                  />
              )
            })}
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


      <CreatePostModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
    </>
  )
}
