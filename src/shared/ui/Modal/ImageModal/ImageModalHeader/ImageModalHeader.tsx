'use client'

import React, { useState, useRef, useEffect } from 'react'
import styles from './ImageModalHeader.module.scss'
import { useDataProfileQuery } from "@/pages/profile/api/useDataProfileQuery"
import s from "@/widgets/sidebar/ui/Sidebar.module.scss"
import { Icon } from "@/shared/ui/Icon/Icon"
import { Modal } from "@/shared/ui/Modal/Modal"
import { Button } from "@/shared/ui/Button/Button"
import { useDeletePost } from "@/shared/api/usePostDelete"
import { usePostQuery } from "@/shared/api/usePostQuery"

type ImageModalHeaderProps = {
    onEditClick?: () => void
    onDeleteClick?: () => void
    onPostDeleted?: () => void
    postId: number
}

export default function ImageModalHeader({
                                             postId,
                                             onEditClick,
                                             onDeleteClick,
                                             onPostDeleted,

                                         }: ImageModalHeaderProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    const deletePostMutation = useDeletePost()
    const { data: dataProfile } = useDataProfileQuery()
    const { data: postInfo} = usePostQuery(postId)

    // Проверяем, является ли текущий пользователь владельцем поста
    const isOwner = postInfo?.ownerId === dataProfile?.id

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
        onEditClick?.()
    }

    const handleDeleteClick = () => {
        setIsMenuOpen(false)
        onDeleteClick?.()
        setIsModalOpen(true)
    }

    const handleDeleteConfirm = async () => {
        try {
            if (postInfo?.id) {
                await deletePostMutation.mutateAsync(postInfo.id)
                setIsModalOpen(false)
                onPostDeleted?.()
            }
        } catch (error) {
            console.error('Delete post error:', error)
        }
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    // Если пост не найден
    if (!postInfo) {
        return null
    }

    return (
        <div className={styles.header}>
            <div className={styles.userInfo}>
                {/* Аватарка пользователя */}
                {postInfo.avatarOwner ? (
                    <img
                        src={postInfo.avatarOwner}
                        alt={`${postInfo.userName || 'User'}'s avatar`}
                        className={styles.avatar}
                        onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                        }}
                    />
                ) : (
                    <div className={styles.avatarPlaceholder}>
                        {(postInfo.userName?.charAt(0) || 'U').toUpperCase()}
                    </div>
                )}
                {/* Имя пользователя */}
                <span className={styles.userName}>
                    {postInfo.userName || 'Unknown User'}
                </span>
            </div>

            {/* Меню (три точки) - показываем только владельцу поста */}
            {isOwner && (
                <div className={styles.menuWrapper} ref={menuRef}>
                    <button
                        onClick={toggleMenu}
                        className={styles.menuButton}
                        aria-expanded={isMenuOpen}
                    >
                        ...
                    </button>

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

                    <Modal
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        title={'Delete Post'}
                        showButton={false}
                    >
                        <div className={styles.modalContent}>
                            <p className={styles.modalText}>
                                Are you sure you want to delete this post?
                            </p>
                            <div className={styles.buttonsBlock}>
                                <Button
                                    variant="outline"
                                    onClick={handleDeleteConfirm}
                                    disabled={deletePostMutation.isPending}
                                    width={96}
                                >
                                    {deletePostMutation.isPending ? 'Deleting...' : 'Yes'}
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={closeModal}
                                    disabled={deletePostMutation.isPending}
                                    width={96}
                                >
                                    No
                                </Button>
                            </div>
                        </div>
                    </Modal>
                </div>
            )}
        </div>
    )
}