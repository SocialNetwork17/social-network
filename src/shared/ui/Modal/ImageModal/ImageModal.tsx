'use client'

import { useEffect, useState } from 'react'
import styles from './ImageModal.module.scss'
import {Card} from '../../Card/Card'
import { EditPostHeader } from '@/shared/ui/Modal/ImageModal/EditPostHeader/EditPostHeader'
import {ImageModalHeader} from '@/shared/ui/Modal/ImageModal/ImageModalHeader/ImageModalHeader'
import { useUpdatePostMutation } from '@/shared/api/useUpdatePostMutation'
import { usePostQuery } from '@/shared/api/usePostQuery'
import { useModal } from '@/widgets/modal/model/modal.context'
import {
  EditPostModalType,
  openCancelEditPostModalAC,
  OpenViewPostModalAC,
  openViewPostModalAC,
} from '@/widgets/modal/model/modal.types'
import { Button } from '@/shared/ui/Button/Button'
import { IconButton } from '@/shared/ui/IconButton/IconButton'
import {Comment} from '../../Comment/Comment'

type Props = {
  modal: OpenViewPostModalAC | EditPostModalType
}

export const ImageModal = (props: Props) => {
  const { modal } = props

  const [text, setText] = useState('')
  const { pushModal, clearModals } = useModal()
  const { mutateAsync, isPending } = useUpdatePostMutation()
  const { data: postInfo, isLoading } = usePostQuery(modal.payload.postId)

  useEffect(() => {
    if (postInfo && modal.type === 'EDIT_POST') {
      setText(postInfo.description)
    }
  }, [postInfo, modal?.type])

  if (isLoading || !postInfo) return null

  const imageSlider = postInfo.images.map(image => image.url)

  const handleCloseViewPostModal = () => {
    clearModals()
  }

  const handleSave = async () => {
    try {
      await mutateAsync({
        postId: postInfo!.id,
        description: text,
      })
      clearModals()
      pushModal(openViewPostModalAC({ postId: postInfo!.id }))
    } catch (error) {
      console.error('Failed to update post:', error)
    }
  }

  const onCloseEditPostModal = () => {
    if (text === postInfo.description) {
      clearModals()
      pushModal(openViewPostModalAC({ postId: postInfo!.id }))
      return
    }
    pushModal(
      openCancelEditPostModalAC({
        title: 'Edit Post',
        description: 'Are you sure you want to undo the post edit?',
      })
    )
  }

  return (
    <div className={styles.modalContent}>
      {modal.type === 'EDIT_POST' && <EditPostHeader onCloseEditPostModal={onCloseEditPostModal} />}

      <Card images={imageSlider} slider={true} width={490} height={564} />
      <div className={styles.modalDescription}>
        <ImageModalHeader postId={postInfo.id} />
        {modal.type === 'VIEW_POST' && <Comment post={postInfo} />}

        {/*todo*/}
        {modal.type === 'EDIT_POST' && (
          <div className={styles.editSection}>
            <p className={styles.helpText}>Add publication descriptions</p>
            <textarea
              value={text}
              onChange={e => setText(e.currentTarget.value)}
              className={styles.textarea}
            />

            <div className={styles.saveButton}>
              <Button
                variant={'primary'}
                onClick={handleSave}
                disabled={isPending || text === postInfo.description}
                width={136}
                height={36}
              >
                {isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
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
