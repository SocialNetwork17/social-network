'use client'

import React from 'react'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import s from '../Sidebar.module.scss'
import {Path} from "@/widgets/Sidebar/ui/Sidebar.config";
import {Icon} from "@/shared/ui/Icon/Icon";

interface Props {
    href: string
    label: string
    icon: string
    disabled?: boolean
}

export const SidebarLink = ({href, label, icon, disabled = false}: Props) => {

    const pathname = usePathname()

    //если pathname равен null, используем '/'
    const safePathname = pathname || Path.Feed;

    const isActive = href === Path.Feed
        ? safePathname === Path.Feed
        : safePathname.startsWith(href);


    const linkClasses = disabled
        ? `${s.sidebarLink} ${s.disabled}`
        : isActive
            ? `${s.sidebarLink} ${s.activeLink}`
            : s.sidebarLink


    //<Link> заменяем на <span> для блокировки клика
    if (disabled) {
        return (
            <li className={s.sidebarItem}>
        <span className={linkClasses}>
            <Icon iconId={icon}/>
            <span>{label}</span>
        </span>
            </li>
        )
    }

    return (
        <li className={s.sidebarItem}>
            <Link href={href} className={linkClasses}>
                <Icon iconId={icon}/>
                <span>{label}</span>
            </Link>
        </li>
    )
}