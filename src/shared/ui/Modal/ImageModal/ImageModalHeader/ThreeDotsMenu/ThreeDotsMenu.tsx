'use client'

import React, { useState, useRef } from 'react'
import s from './ThreeDotsMenu.module.scss'
import { IconButton } from "@/shared/ui/IconButton/IconButton"
import {DropdownMenu} from "@/shared/ui/Modal/ImageModal/ImageModalHeader/ThreeDotsMenu/DropdownMenu/DropdownMenu";
import {
    useClickOutside
} from "@/shared/ui/Modal/ImageModal/ImageModalHeader/ThreeDotsMenu/DropdownMenu/useClickOutside";

type ThreeDotsMenuProps = {
    onEdit: () => void
    onDelete: () => void
}

export const ThreeDotsMenu = ({ onEdit, onDelete }: ThreeDotsMenuProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    // Закрытие меню при клике снаружи
    const menuRef = useRef<HTMLDivElement>(null)
    useClickOutside(menuRef, () => {
        if (isMenuOpen) setIsMenuOpen(false)
    })

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const handleEdit = () => {
        setIsMenuOpen(false)
        onEdit()
    }

    const handleDeleteClick = () => {
        setIsMenuOpen(false)
        onDelete()
    }

    return (
        <div className={s.menuWrapper} ref={menuRef}>
            <div className={s.menuButton} aria-expanded={isMenuOpen}>
                <IconButton
                    onClick={toggleMenu}
                    iconId="threeDots"
                    size={24}
                    viewBox="0 0 24 24"
                />
            </div>

            {isMenuOpen && (
                <DropdownMenu
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                />
            )}
        </div>
    )
}