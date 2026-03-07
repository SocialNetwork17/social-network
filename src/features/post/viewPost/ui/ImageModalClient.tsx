'use client'

import {useEffect, useState} from 'react'
import styles from './ImageModalClient.module.scss'
import {EditPostHeader} from '@/features/post/viewPost/ui/EditPostHeader/EditPostHeader'
import {useModal} from '@/widgets/modal/model/modal.context'
import {EditPostModalType, OpenViewPostModalType} from '@/widgets/modal/model/modal.types'
import {IconButton} from '@/shared/ui/IconButton/IconButton'
import {EditModeSection} from '@/features/post/viewPost/ui/EditModeSection/EditModeSection'
import {ImageModalHeader} from '@/features/post/viewPost/ui/ImageModalHeader/ImageModalHeader'
import {useDeletePostIdFromUrl} from "@/shared/hooks/useDeletePostIdFromUrl";
import {Card} from "@/shared/ui/Card/Card";
import {Comment} from "@/shared/ui/Comment/Comment";
import {usePostQuery} from "@/shared/api/usePostQuery";

type Props = {
  modal: OpenViewPostModalType | EditPostModalType
}

export const ImageModalClient = ({modal}: Props) => {

  const [text, setText] = useState('')
  const { clearModals } = useModal()
  const {deletePostIdFromUrl} = useDeletePostIdFromUrl()

  const {data: profileInfo} = usePostQuery(modal.payload.postId)

  useEffect(() => {
    if (profileInfo && modal.type === 'EDIT_POST') {
      setText(profileInfo.description)
    }
  }, [profileInfo, modal?.type])

  if(!profileInfo) return

  const imageSlider = profileInfo.images.map(image => image.url)

  const handleCloseViewPostModal = () => {
    deletePostIdFromUrl()
    clearModals()
  }

  return (
    <div className={styles.modalContent}>
      {modal.type === 'EDIT_POST' && <EditPostHeader postId={profileInfo.id} text={text} />}

      <Card images={imageSlider} slider={true} width={490} height={564} />
      <div className={styles.modalDescription}>
        <ImageModalHeader postId={profileInfo.id} isEditMode={modal.type === 'EDIT_POST'} />
        {modal.type === 'VIEW_POST' && <Comment post={profileInfo} />}
        {modal.type === 'EDIT_POST' && (
          <EditModeSection text={text} postId={profileInfo.id} setText={setText} />
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
