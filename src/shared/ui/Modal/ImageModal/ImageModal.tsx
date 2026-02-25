'use client'

import { useEffect, useState } from 'react'
import styles from './ImageModal.module.scss'
import { Card } from '../../Card/Card'
import { EditPostHeader } from '@/shared/ui/Modal/ImageModal/EditPostHeader/EditPostHeader'
import { usePostQuery } from '@/shared/api/usePostQuery'
import { useModal } from '@/widgets/modal/model/modal.context'
import { EditPostModalType, OpenViewPostModalAC } from '@/widgets/modal/model/modal.types'
import { IconButton } from '@/shared/ui/IconButton/IconButton'
import { EditModeSection } from '@/shared/ui/Modal/ImageModal/EditModeSection/EditModeSection'
import { Comment } from '../../Comment/Comment'
import { ImageModalHeader } from '@/shared/ui/Modal/ImageModal/ImageModalHeader/ImageModalHeader'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {PATH} from "@/shared/constants/routings";

type Props = {
  modal: OpenViewPostModalAC | EditPostModalType
}

export const ImageModal = (props: Props) => {
  const { modal } = props

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams() // Получаем текущие query параметры

  const [text, setText] = useState('')
  const { clearModals } = useModal()
  const { data: postInfo, isLoading } = usePostQuery(modal.payload.postId)

  useEffect(() => {
    if (postInfo && modal.type === 'EDIT_POST') {
      setText(postInfo.description)
    }
  }, [postInfo, modal?.type])

  if (isLoading || !postInfo) return null

  const imageSlider = postInfo.images.map(image => image.url)

  const removePostIdFromUrl = () => {
    // Создаем новый URLSearchParams на основе текущих
    const params = new URLSearchParams(searchParams?.toString())
    // Удаляем только postId
    params.delete('postId')

    // Формируем новый URL
    const newUrl = params.toString()
      ? `${pathname}?${params.toString()}` // Если есть другие параметры
      : pathname // Если других параметров нет

    // Обновляем URL
    router.push(newUrl ?? PATH.MAIN, { scroll: false })
  }

  const handleCloseViewPostModal = () => {
    removePostIdFromUrl()
    clearModals()
  }

  return (
    <div className={styles.modalContent}>
      {modal.type === 'EDIT_POST' && <EditPostHeader postId={postInfo.id} text={text} />}

      <Card images={imageSlider} slider={true} width={490} height={564} />
      <div className={styles.modalDescription}>
        <ImageModalHeader postId={postInfo.id} />
        {modal.type === 'VIEW_POST' && <Comment post={postInfo} />}
        {modal.type === 'EDIT_POST' && (
          <EditModeSection text={text} postId={postInfo.id} setText={setText} />
        )}
      </div>
      {modal.type !== 'EDIT_POST' && (
        <div className={styles.closeButton}>
          <IconButton onClick={handleCloseViewPostModal} iconId={'logoutBtnCloseSvg'} />
        </div>
      )}
    </div>
  )
}
