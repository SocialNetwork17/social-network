'use client'

import React from 'react'
import s from './DropdownMenu.module.scss'
import { Icon } from "@/shared/ui/Icon/Icon"

type DropdownMenuProps = {
    onEdit: () => void
    onDelete: () => void
}

export const DropdownMenu = ({ onEdit, onDelete }: DropdownMenuProps) => {
    return (
        <div className={s.dropdownMenu}>
            <button onClick={onEdit} className={s.dropdownItem}>
                <span className={s.dropdownIcon}>
                  <Icon iconId="edit" size={24}/>
                </span>
                <span className={s.dropdownText}>Edit Post</span>
            </button>
            <button onClick={onDelete} className={`${s.dropdownItem} ${s.deleteItem}`} >
                <span className={s.dropdownIcon}>
                  <Icon iconId="delete" size={24}/>
                </span>
                <span className={s.dropdownText}>Delete Post</span>
            </button>
        </div>
    )
}