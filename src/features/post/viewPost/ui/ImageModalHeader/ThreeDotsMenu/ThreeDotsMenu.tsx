'use client'

import React, { useState, useRef } from 'react'
import s from './ThreeDotsMenu.module.scss'
import { IconButton } from "@/shared/ui/IconButton/IconButton"
import {DropdownMenu} from "@/features/post/viewPost/ui/ImageModalHeader/ThreeDotsMenu/DropdownMenu/DropdownMenu";
import {
    useClickOutside
} from "@/features/post/viewPost/ui/ImageModalHeader/ThreeDotsMenu/DropdownMenu/useClickOutside";
import {useModal} from "@/widgets/modal/model/modal.context";
import {deletePostModalAC, openEditPostModalAC} from "@/widgets/modal/model/modal.types";

type ThreeDotsMenuProps = {
    postId: number
}

export const ThreeDotsMenu = ({ postId }: ThreeDotsMenuProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const {pushModal, popModal} = useModal()

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
        popModal() // закрываем VIEW_POST
        pushModal(openEditPostModalAC({postId}))
    }

    const handleDeleteClick = () => {
        setIsMenuOpen(false)
        pushModal(deletePostModalAC({
            title: 'Delete Post',
            description: 'Are you sure you want to delete this post?',
            postId: postId
        }))
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