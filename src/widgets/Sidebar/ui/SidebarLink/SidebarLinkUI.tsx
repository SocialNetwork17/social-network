import s from "@/widgets/Sidebar/ui/Sidebar.module.scss";
import {Icon} from '@/shared/components/Icon/Icon';
import React from "react";

interface SidebarLinkUIProps {
    label: string
    icon: string
    state?: 'default' | 'active' | 'hover' | 'disabled'
    onClick?: () => void
}

export const SidebarLinkUI = ({ label, icon, state = 'default', onClick }: SidebarLinkUIProps) => {
    const getLinkClasses = () => {
        switch (state) {
            case 'disabled':
                return `${s.sidebarLink} ${s.disabled}`
            case 'active':
                return `${s.sidebarLink} ${s.activeLink}`
            case 'hover':
                return s.sidebarLink
            default:
                return s.sidebarLink
        }
    }

    const linkContent = (
        <>
            <Icon iconId={icon} size={24} className={s.sidebarIcon} />
            <span>{label}</span>
        </>
    )

    if (state === 'disabled') {
        return (
            <li className={s.sidebarItem}>
        <span className={getLinkClasses()}>
          {linkContent}
        </span>
            </li>
        )
    }

    return (
        <li className={s.sidebarItem}>
            {onClick ? (
                <button className={getLinkClasses()} onClick={onClick} style={{ all: 'unset', cursor: 'pointer', width: '100%' }}>
                    {linkContent}
                </button>
            ) : (
                <span className={getLinkClasses()}>
          {linkContent}
        </span>
            )}
        </li>
    )
}