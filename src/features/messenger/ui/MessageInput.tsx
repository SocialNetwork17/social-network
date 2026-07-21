'use client'

import Image from 'next/image'
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import { Icon } from '@/shared/ui/Icon/Icon'
import { useSnackbar } from '@/widgets/snackbar/model/snackbar.context'
import { SendMessageResult } from '../model/types'
import styles from './MessageInput.module.scss'
import { VoiceMessagePlayer } from './VoiceMessagePlayer'

type Props = {
  onSendMessage: (text: string, images?: File[]) => Promise<SendMessageResult>
  onSendVoiceMessage: (audio: Blob) => Promise<SendMessageResult>
}

const MAX_IMAGE_SIZE = 1024 * 1024
const MAX_VOICE_SIZE = 3 * 1024 * 1024
const MAX_VOICE_DURATION_MS = 60_000
const RECORDING_BAR_WIDTH = 2
const RECORDING_BAR_GAP = 2
const RECORDING_BAR_HEIGHTS = [
  8, 12, 7, 15, 10, 18, 12, 20, 9, 14, 18, 11, 16, 8, 20, 13, 17, 10, 19, 12, 15, 9,
  18, 11, 20, 14, 8, 16, 12, 18, 10, 15,
]

type SelectedImage = {
  file: File
  id: string
  previewUrl: string
}

type RecordedVoice = {
  blob: Blob
  previewUrl: string
}

const createImageId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`

const getSupportedVoiceMimeType = () => {
  if (typeof MediaRecorder === 'undefined') {
    return undefined
  }

  return ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4'].find(type =>
    MediaRecorder.isTypeSupported(type)
  )
}

const formatRecordingTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

export const MessageInput = ({ onSendMessage, onSendVoiceMessage }: Props) => {
  const [value, setValue] = useState('')
  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordedVoice, setRecordedVoice] = useState<RecordedVoice | null>(null)
  const [recordingSeconds, setRecordingSeconds] = useState(0)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const recordingChunksRef = useRef<Blob[]>([])
  const recordingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const recordingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const recordingStreamRef = useRef<MediaStream | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const recordingWaveformRef = useRef<HTMLSpanElement>(null)
  const selectedImagesRef = useRef<SelectedImage[]>([])
  const [recordingWaveformWidth, setRecordingWaveformWidth] = useState(0)
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
  const hasRecordedVoice = Boolean(recordedVoice)
  const isDisabled = (!hasMessage && !hasImage) || isSubmitting
  const recordingBarCount = Math.max(
    1,
    Math.floor((recordingWaveformWidth + RECORDING_BAR_GAP) / (RECORDING_BAR_WIDTH + RECORDING_BAR_GAP))
  )

  useEffect(() => {
    if (!isRecording) {
      setRecordingWaveformWidth(0)
      return
    }

    const element = recordingWaveformRef.current

    if (!element) {
      return
    }

    let isObserverActive = true
    const observer = new ResizeObserver(entries => {
      const entry = entries[0]

      if (!entry || !isObserverActive) {
        return
      }

      setRecordingWaveformWidth(entry.contentRect.width)
    })

    observer.observe(element)

    return () => {
      isObserverActive = false
      observer.disconnect()
    }
  }, [isRecording])

  useEffect(() => {
    const textarea = textareaRef.current

    if (!textarea) {
      return
    }

    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
  }, [value])

  const cleanupRecording = () => {
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current)
      recordingIntervalRef.current = null
    }

    if (recordingTimeoutRef.current) {
      clearTimeout(recordingTimeoutRef.current)
      recordingTimeoutRef.current = null
    }

    recordingStreamRef.current?.getTracks().forEach(track => track.stop())
    recordingStreamRef.current = null
    mediaRecorderRef.current = null
    setIsRecording(false)
    setRecordingSeconds(0)
  }

  const discardRecordedVoice = () => {
    setRecordedVoice(prev => {
      if (prev) {
        URL.revokeObjectURL(prev.previewUrl)
      }

      return null
    })
  }

  const stopRecording = () =>
    new Promise<Blob>((resolve, reject) => {
      const recorder = mediaRecorderRef.current

      if (!recorder || recorder.state === 'inactive') {
        cleanupRecording()
        reject(new Error('Voice recording is not active'))
        return
      }

      recorder.onstop = () => {
        const chunks = recordingChunksRef.current
        const audio = new Blob(chunks, { type: recorder.mimeType || 'audio/webm' })

        recordingChunksRef.current = []
        cleanupRecording()
        resolve(audio)
      }

      recorder.stop()
    })

  const cancelRecording = () => {
    const recorder = mediaRecorderRef.current

    recordingChunksRef.current = []

    if (recorder && recorder.state !== 'inactive') {
      recorder.onstop = cleanupRecording
      recorder.stop()
      return
    }

    cleanupRecording()
  }

  const saveVoiceRecording = async () => {
    if (isSubmitting) {
      return
    }

    try {
      const audio = await stopRecording()

      if (audio.size > MAX_VOICE_SIZE) {
        errorSnackbar('Voice message size must be less than 3MB')
        return
      }

      discardRecordedVoice()
      setRecordedVoice({
        blob: audio,
        previewUrl: URL.createObjectURL(audio),
      })
    } catch (error) {
      errorSnackbar(error instanceof Error ? error.message : 'Voice recording was not saved')
    }
  }

  const sendRecordedVoice = async () => {
    if (!recordedVoice || isSubmitting) {
      return
    }

    setIsSubmitting(true)

    try {
      const result = await onSendVoiceMessage(recordedVoice.blob)

      if (!result.success) {
        errorSnackbar(result.error)
        return
      }

      discardRecordedVoice()
    } finally {
      setIsSubmitting(false)
    }
  }

  const startRecording = async () => {
    if (isSubmitting) {
      return
    }

    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      errorSnackbar('Voice recording is not supported in this browser')
      return
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mimeType = getSupportedVoiceMimeType()
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined)

      recordingChunksRef.current = []
      recordingStreamRef.current = stream
      mediaRecorderRef.current = recorder
      recorder.ondataavailable = event => {
        if (event.data.size > 0) {
          recordingChunksRef.current.push(event.data)
        }
      }
      recorder.start()
      setIsRecording(true)
      setRecordingSeconds(0)
      recordingIntervalRef.current = setInterval(() => {
        setRecordingSeconds(prev => prev + 1)
      }, 1000)
      recordingTimeoutRef.current = setTimeout(() => {
        void saveVoiceRecording()
      }, MAX_VOICE_DURATION_MS)
    } catch {
      cleanupRecording()
      errorSnackbar('Microphone access is required to record a voice message')
    }
  }

  useEffect(
    () => () => {
      cancelRecording()
      discardRecordedVoice()
    },
    []
  )

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
        {isRecording ? (
          <div className={styles.recordingPanel}>
            <button
              className={styles.iconButton}
              type={'button'}
              aria-label={'Cancel voice message'}
              onClick={cancelRecording}
              disabled={isSubmitting}
            >
              <Icon
                iconId={'close-circle'}
                size={24}
                className={styles.iconSvg}
              />
            </button>
            <span
              className={styles.recordingWaveform}
              ref={recordingWaveformRef}
              aria-label="Recording voice message"
            >
              {Array.from({ length: recordingBarCount }, (_, index) => {
                const height = RECORDING_BAR_HEIGHTS[index % RECORDING_BAR_HEIGHTS.length]

                return (
                  <span
                    className={styles.recordingBar}
                    key={index}
                    style={{ height }}
                  />
                )
              })}
            </span>
            <span className={styles.recordingDot} />
            <span className={styles.recordingText}>{formatRecordingTime(recordingSeconds)}</span>
          </div>
        ) : recordedVoice ? (
          <div className={styles.voicePreview}>
            <button
              className={styles.iconButton}
              type={'button'}
              aria-label={'Delete voice message'}
              onClick={discardRecordedVoice}
              disabled={isSubmitting}
            >
              <Icon
                iconId={'close-circle'}
                size={24}
                className={styles.iconSvg}
              />
            </button>
            <VoiceMessagePlayer src={recordedVoice.previewUrl} variant="composer" />
          </div>
        ) : selectedImages.length > 0 ? (
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
                  <Icon iconId={'close-circle'} size={24} />
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
        ) : null}
        {!isRecording && !recordedVoice && (
          <textarea
            ref={textareaRef}
            className={styles.textarea}
            onChange={event => setValue(event.currentTarget.value)}
            onKeyDown={onKeyDown}
            placeholder={'Type Message...'}
            rows={1}
            value={value}
          />
        )}
      </div>
      {isRecording ? (
        <div className={styles.actions}>
          <button
            className={styles.textButton}
            type={'button'}
            aria-label={'Save voice message'}
            onClick={saveVoiceRecording}
            disabled={isSubmitting}
          >
            Send voice
          </button>
        </div>
      ) : hasRecordedVoice ? (
        <div className={styles.voiceActions}>
          <button
            className={styles.textButton}
            type={'button'}
            disabled={isSubmitting}
            onClick={sendRecordedVoice}
          >
            Send voice
          </button>
        </div>
      ) : hasMessage || hasImage ? (
        <button
          className={styles.textButton}
          type={'button'}
          disabled={isDisabled}
          onClick={submitMessage}
        >
          Send message
        </button>
      ) : (
        <div className={styles.actions}>
          <button
            className={styles.iconButton}
            type={'button'}
            aria-label={'Voice message'}
            onClick={startRecording}
            disabled={isSubmitting}
          >
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
