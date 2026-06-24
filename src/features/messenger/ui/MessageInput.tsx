'use client'

import Image from 'next/image'
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import { Button } from '@/shared/ui/Button/Button'
import { Icon } from '@/shared/ui/Icon/Icon'
import { useSnackbar } from '@/widgets/snackbar/model/snackbar.context'
import { SendMessageResult } from '../model/types'
import styles from './MessageInput.module.scss'

type Props = {
  onSendMessage: (text: string, images?: File[]) => Promise<SendMessageResult>
}

const MAX_IMAGE_SIZE = 1024 * 1024

type SelectedImage = {
  file: File
  id: string
  previewUrl: string
}

const createImageId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`

export const MessageInput = ({ onSendMessage }: Props) => {
  const [value, setValue] = useState('')
  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const selectedImagesRef = useRef<SelectedImage[]>([])
  const { errorSnackbar } = useSnackbar()

  useEffect(() => {
    selectedImagesRef.current = selectedImages
  }, [selectedImages])

  useEffect(
    () => () => {
      selectedImagesRef.current.forEach(image => URL.revokeObjectURL(image.previewUrl))
    },
    []
  )

  const hasMessage = Boolean(value.trim())
  const hasImage = selectedImages.length > 0
  const isDisabled = (!hasMessage && !hasImage) || isSubmitting

  const submitMessage = async () => {
    if (isDisabled) {
      return
    }

    const textToSend = value
    const imagesToSend = selectedImages.map(image => image.file)

    setValue('')
    selectedImages.forEach(image => URL.revokeObjectURL(image.previewUrl))
    setSelectedImages([])
    selectedImagesRef.current = []
    setIsSubmitting(true)

    try {
      const result = await onSendMessage(textToSend, imagesToSend.length ? imagesToSend : undefined)

      if (!result.success) {
        errorSnackbar(result.error)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const onKeyDown = async (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== 'Enter' || event.shiftKey) {
      return
    }

    event.preventDefault()

    if (isDisabled) {
      return
    }

    await submitMessage()
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? [])

    if (!files.length) return

    const validFiles = files.filter(file => file.size <= MAX_IMAGE_SIZE)

    if (validFiles.length !== files.length) {
      errorSnackbar('Image size must be less than 1MB')
      event.target.value = ''
    }

    if (validFiles.length) {
      setSelectedImages(prev => [
        ...prev,
        ...validFiles.map(file => ({
          file,
          id: createImageId(),
          previewUrl: URL.createObjectURL(file),
        })),
      ])
    }

    event.target.value = ''
  }

  const removeSelectedImage = (id: string) => {
    setSelectedImages(prev => {
      const imageToRemove = prev.find(image => image.id === id)

      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.previewUrl)
      }

      return prev.filter(image => image.id !== id)
    })

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.inputArea}>
        {selectedImages.length > 0 && (
          <div className={styles.previewActions}>
            {selectedImages.map(image => (
              <div className={styles.preview} key={image.id}>
                <Image
                  src={image.previewUrl}
                  alt="Selected image"
                  className={styles.previewImage}
                  width={36}
                  height={36}
                  unoptimized
                />
                <button
                  type="button"
                  className={styles.removePreviewButton}
                  onClick={() => removeSelectedImage(image.id)}
                  aria-label="Remove selected image"
                >
                  <Icon iconId={'close-outline'} size={16} viewBox="0 0 16 16" />
                </button>
              </div>
            ))}
            <button
              type="button"
              className={styles.addPreviewButton}
              onClick={() => fileInputRef.current?.click()}
              aria-label="Add another image"
            >
              <Icon iconId={'plus-circle-outline'} size={24} viewBox="0 0 24 24" />
            </button>
          </div>
        )}
        <textarea
          className={styles.textarea}
          onChange={event => setValue(event.currentTarget.value)}
          onKeyDown={onKeyDown}
          placeholder={'Type Message...'}
          rows={1}
          value={value}
        />
      </div>
      {hasMessage || hasImage ? (
        <Button variant={'textButton'} disabled={isDisabled} onClick={submitMessage} width={200}>
          Send message
        </Button>
      ) : (
        <div className={styles.actions}>
          <button className={styles.iconButton} type={'button'} aria-label={'Voice message'}>
            <Icon iconId={'mic-outline'} size={20} className={styles.iconSvg} />
          </button>
          <button
            className={styles.iconButton}
            type={'button'}
            aria-label={'Image upload'}
            onClick={() => fileInputRef.current?.click()}
          >
            <Icon iconId={'image-outline'} size={20} className={styles.iconSvg} />
          </button>
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png"
        multiple
        hidden
        onChange={handleImageChange}
      />
    </div>
  )
}
