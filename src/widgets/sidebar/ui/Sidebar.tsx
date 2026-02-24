'use client'

import s from './Sidebar.module.scss'
import { SidebarLink } from './SidebarLink/SidebarLink'
import { Icon } from '@/shared/ui/Icon/Icon'
import { menuItems } from '@/widgets/sidebar/ui/Sidebar.config'
import { useMeQuery } from '@/shared/api/useMeQuery'
import { Path } from './Sidebar.config'
import { useModal } from '@/widgets/modal/model/modal.context'
import { createPostModalAC, logoutModalAC } from '@/widgets/modal/model/modal.types'
import { useAuth } from '@/shared/hooks/useAuth'

export const Sidebar = () => {
  const { user } = useAuth()
  //todo
  // const mainItems = menuItems.slice(0, 5)

  const mainItems = menuItems.slice(0, 5).map(item => {
    if (item.href === Path.Profile && user?.userId) {
      return {
        ...item,
        href: `${Path.Profile}/${user.userId}`, // добавляем userId к пути
      }
    }
    return item
  })
  const bottomItems = menuItems.slice(5)

  const { pushModal } = useModal()
  const { data } = useMeQuery()

  const handleLogoutOpen = () => {
    pushModal(
      logoutModalAC({
        title: 'Log Out',
        email: data?.email || '',
        description: 'Are you really want to log out of your account ',
      })
    )
  }

  const handleOpenCreateModal = () => {
    pushModal(createPostModalAC())
  }

  return (
    <>
      <aside className={s.sidebar}>
        <nav className={s.navSidebar}>
          <ul className={s.sidebarList}>
            {mainItems.map(item => {
              if (item.href === Path.Create) {
                return (
                  <button
                    key={item.href}
                    className={`${s.sidebarLink} ${s.buttonAsLink}`}
                    onClick={handleOpenCreateModal}
                    type="button"
                  >
                    <Icon iconId={'create'} size={24} className={s.sidebarIcon} />
                    <span>Create</span>
                  </button>
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
              <button className={`${s.sidebarLink} ${s.logoutButton}`} onClick={handleLogoutOpen}>
                <Icon iconId="logOut" size={24} className={s.sidebarIcon} />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </nav>
      </aside>
    </>
  )
}
