'use client'

import React, { useState, useRef, useEffect } from 'react'
import styles from './ImageModalHeader.module.scss'
import s from "@/widgets/sidebar/ui/Sidebar.module.scss"
import { Icon } from "@/shared/ui/Icon/Icon"
import { usePostQuery } from "@/shared/api/usePostQuery"
import {useModal} from "@/widgets/modal/model/modal.context";
import {deletePostModalAC} from "@/widgets/modal/model/modal.types";
import { openEditPostModalAC } from "@/widgets/modal/model/modal.types"
import {useDataMyProfileQuery} from "@/pages/profile/api/useDataMyProfileQuery";
import LinkUserName from '@/shared/ui/LinkUserName/LinkUserName'

type ImageModalHeaderProps = {
    postId: number
}

export default function ImageModalHeader({postId,}: ImageModalHeaderProps) {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    const { pushModal, popModal } = useModal()

    const { data: dataProfile } = useDataMyProfileQuery()
    const { data: postInfo} = usePostQuery(postId)

    // Проверяем, является ли текущий пользователь владельцем поста
    const isOwner = postInfo?.ownerId === dataProfile?.id


    /*todo*/

    // Закрытие меню при клике снаружи
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsMenuOpen(false)
            }
        }
        if (isMenuOpen) {
            document.addEventListener('click', handleClickOutside)
        }

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [isMenuOpen])

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const handleEdit = () => {
        setIsMenuOpen(false)

        if (!postInfo) return
        popModal() // закрываем VIEW_POST
        pushModal(openEditPostModalAC({ postId }))
    }

    const handleDeleteClick = () => {
        setIsMenuOpen(false)
        pushModal(deletePostModalAC({title: 'Delete Post', description: 'Are you sure you want to delete this post?', postId: postId }))
    }

    // Если пост не найден
    if (!postInfo) {
        return null
    }

    return (
        <div className={styles.header}>
            <LinkUserName post={postInfo}/>

            {/* Меню (три точки) - показываем только владельцу поста */}
            {/*todo*/}
            {isOwner && (
                <div className={styles.menuWrapper} ref={menuRef}>
                    <button
                        onClick={toggleMenu}
                        className={styles.menuButton}
                        aria-expanded={isMenuOpen}
                    >
                        ...
                    </button>
                    {/*todo*/}
                    {isMenuOpen && (
                        <div className={styles.dropdownMenu}>
                            <button
                                onClick={handleEdit}
                                className={styles.dropdownItem}
                            >
                                <span className={styles.dropdownIcon}>
                                    <Icon iconId={'edit'} size={24} className={s.sidebarIcon} />
                                </span>
                                <span className={styles.dropdownText}>Edit Post</span>
                            </button>
                            <button
                                onClick={handleDeleteClick}
                                className={`${styles.dropdownItem} ${styles.deleteItem}`}
                            >
                                <span className={styles.dropdownIcon}>
                                    <Icon iconId={"delete"} size={24} className={s.sidebarIcon} />
                                </span>
                                <span className={styles.dropdownText}>Delete Post</span>
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}