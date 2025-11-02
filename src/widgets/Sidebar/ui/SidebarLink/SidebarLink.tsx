'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import s from '../Sidebar.module.css'
import { Icon } from '@/shared/ui/Icon/Icon'

interface SidebarLinkProps {
  href: string
  label: string
  icon: string
}

export const SidebarLink = ({ href, label, icon }: SidebarLinkProps) => {
  const pathname = usePathname()

  const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)

  const linkClasses = isActive
    ? `${s.sidebarLink} ${s.activeLink}` // Добавляем класс 'activeLink'
    : s.sidebarLink

  return (
    <li className={s.sidebarItem}>
      <Link href={href} className={linkClasses}>
        <Icon iconId={icon} size={24} className={s.sidebarIcon} />
        <span>{label}</span>
      </Link>
    </li>
  )
}
