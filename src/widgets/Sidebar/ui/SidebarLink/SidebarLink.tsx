'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import s from '../Sidebar.module.scss'
import { Icon } from '@/shared/ui/Icon/Icon'

interface SidebarLinkProps {
  href: string
  label: string
  icon: string
  disabled?: boolean // ← Должен быть здесь
}

export const SidebarLink = ({ href, label, icon, disabled = false  }: SidebarLinkProps) => {

  const pathname = usePathname()

  //если pathname равен null, используем '/'
  const safePathname = pathname || '/';

  const isActive = href === '/'
      ? safePathname === '/'
      : safePathname.startsWith(href);


  const linkClasses = disabled
      ? `${s.sidebarLink} ${s.disabled}`
      : isActive
          ? `${s.sidebarLink} ${s.activeLink}`
          : s.sidebarLink

  // Если ссылка отключена, рендерим span вместо Link
  if (disabled) {
    return (
        <li className={s.sidebarItem}>
        <span className={linkClasses}>
          <Icon iconId={icon} size={24} className={s.sidebarIcon} />
          <span>{label}</span>
        </span>
        </li>
    )
  }

  return (
      <li className={s.sidebarItem}>
        <Link href={href} className={linkClasses}>
          <Icon iconId={icon} size={24} className={s.sidebarIcon} />
          <span>{label}</span>
        </Link>
      </li>
  )
}