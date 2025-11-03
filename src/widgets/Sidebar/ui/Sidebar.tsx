'use client'

import s from './Sidebar.module.scss'
import { SidebarLink } from './SidebarLink/SidebarLink'
import { Icon } from '@/shared/components/Icon/Icon'

export const Path = {
  Feed: '/',
  Create: '/create',
  Profile: '/profile',
  Messenger: '/messenger',
  Search: '/search',
  Statistics: '/statistics',
  Favorites: '/favorites',
  NotFound: '*',
} as const

const menuItems = [
  { href: Path.Feed, label: 'Feed', icon: 'feed' },
  { href: Path.Create, label: 'Create', icon: 'create' },
  { href: Path.Profile, label: 'My Profile', icon: 'myProfile' },
  { href: Path.Messenger, label: 'Messenger', icon: 'messenger' },
  { href: Path.Search, label: 'Search', icon: 'search' },
  { href: Path.Statistics, label: 'Statistics', icon: 'statistic' },
  { href: Path.Favorites, label: 'Favorites', icon: 'favorites' },
]

export const Sibebar = () => {
  const mainItems = menuItems.slice(0, 5)
  const bottomItems = menuItems.slice(5)

  const handleLogout = () => {
    alert('Logout clicked')
  }

  return (
    <aside className={s.sidebar}>
      bar
      <nav className={s.navSidebar}>
        <ul className={s.sidebarList}>
          {mainItems.map(item => (
            <SidebarLink key={item.href} href={item.href} label={item.label} icon={item.icon} />
          ))}
        </ul>
        <div className={s.bottomSection}>
          <ul className={s.sidebarList}>
            {bottomItems.map(item => (
              <SidebarLink key={item.href} href={item.href} label={item.label} icon={item.icon} />
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
  )
}
