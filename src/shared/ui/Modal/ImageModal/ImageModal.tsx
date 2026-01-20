'use client'

import { useEffect, useState } from 'react'
import styles from './ImageModal.module.scss'
import Card from '../../Card/Card'
import { SchemaPostViewModel } from '@/shared/api/schema'
import {EditPostHeader} from "@/shared/ui/Modal/EditPostHeader/EditPostHeader";
import ImageModalHeader from "@/shared/ui/Modal/ImageModal/ImageModalHeader/ImageModalHeader";
import {useDataProfileQuery} from "@/pages/profile/api/useDataProfileQuery";


type Mode = 'view' | 'edit'

type Props = {
  isOpen: boolean
  onClose: () => void
  postInfo: SchemaPostViewModel
  alt?: string
  isLoading: boolean

  mode: Mode
}

export default function ImageModal(props: Props) {
  const { isOpen, onClose, postInfo, alt = '', mode } = props

  const [text, setText] = useState(postInfo.description)


  const { data } = useDataProfileQuery()



  // Блокируем скролл при открытии модалки
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleEscapeKey)
    }

    return () => {
      document.body.style.overflow = 'unset'
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isOpen])

  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const imageSlider = postInfo.images.map(image => image.url)

  const handlePostDeleted = () => {
    onClose() // Закрываем родительскую модалку после удаления
  }

  if (!isOpen) return null

  return (
    <div
      className={styles.modalBackdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Увеличенное изображение"
    >


      {mode === 'edit' && ( //🌱
          <EditPostHeader
              onCancel={onClose}
          />
      )}



      <div className={styles.modalContent}>
        <Card images={imageSlider} slider={true} width={490} height={564}/>
        <div className={styles.modalDescription}>
          <ImageModalHeader
              postId={postInfo.id}
              onPostDeleted={handlePostDeleted}
          />
          {postInfo.description}
        </div>
        {/*<div>{postInfo.description}</div>*/}

        {mode === 'view' && ( //🌱
            <div>{postInfo.description}</div>
        )}

        {mode === 'edit' && ( //🌱
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
        )}


        <button
          onClick={onClose}
          className={styles.closeButton}
          aria-label="Закрыть модальное окно"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
