'use client'

import { MouseEvent, useEffect, useMemo, useRef, useState } from 'react'
import styles from './VoiceMessagePlayer.module.scss'

type Props = {
  src: string
  variant?: 'bubble' | 'composer'
}

const BAR_HEIGHTS = [
  8, 12, 7, 15, 10, 18, 12, 20, 9, 14, 18, 11, 16, 8, 20, 13, 17, 10, 19, 12, 15, 9, 18, 11, 20, 14,
  8, 16, 12, 18, 10, 15,
]

const formatDuration = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return '0:00'
  }

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)

  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

export const VoiceMessagePlayer = ({ src, variant = 'bubble' }: Props) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const waveformRef = useRef<HTMLSpanElement>(null)
  const [waveformWidth, setWaveformWidth] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const progress = duration > 0 ? Math.min(currentTime / duration, 1) : 0
  const barWidth = 2
  const gap = 2
  const barCount = Math.max(
      1, Math.floor((waveformWidth + gap) / (barWidth + gap))
  )
  const activeBarCount = Math.round(progress * barCount)
  const className = variant === 'composer' ? `${styles.player} ${styles.composer}` : styles.player
  const timeLabel = currentTime > 0 ? formatDuration(currentTime) : formatDuration(duration)

  const bars = useMemo(
      () =>
          Array.from({ length: barCount }, (_, index) => {
            const height = BAR_HEIGHTS[index % BAR_HEIGHTS.length]

            return (
                <span
                    className={index < activeBarCount ? `${styles.bar} ${styles.barActive}` : styles.bar}
                    key={index}
                    style={{ height }}
                />
      )}),
    [activeBarCount, barCount]
  )

  useEffect(() => {
    const audio = audioRef.current

    if (!audio) {
      return
    }

    audio.pause()
    audio.currentTime = 0
    setCurrentTime(0)
    setIsPlaying(false)
  }, [src])

  useEffect(() => {
    const element = waveformRef.current

    if (!element) {
      return
    }

    const observer = new ResizeObserver(entries => {
      const entry = entries[0]

      if (!entry) {
        return
      }

      setWaveformWidth(entry.contentRect.width)
    })

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [])

  const togglePlayback = async () => {
    const audio = audioRef.current

    if (!audio) {
      return
    }

    if (audio.paused) {
      await audio.play()
      return
    }

    audio.pause()
  }

  const seek = (event: MouseEvent<HTMLButtonElement>) => {
    const audio = audioRef.current

    if (!audio || duration <= 0) {
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    const nextProgress = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1)

    audio.currentTime = nextProgress * duration
  }

  return (
    <div className={className}>
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onDurationChange={event => setDuration(event.currentTarget.duration)}
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onTimeUpdate={event => setCurrentTime(event.currentTarget.currentTime)}
      />
      <button
        className={styles.playButton}
        type="button"
        aria-label={isPlaying ? 'Pause voice message' : 'Play voice message'}
        onClick={togglePlayback}
      >
        <span className={isPlaying ? styles.pauseIcon : styles.playIcon} />
      </button>
      <button
        className={styles.waveformButton}
        type="button"
        aria-label="Seek voice message"
        onClick={seek}
      >
        <span
            className={styles.waveform}
            ref={waveformRef}
        >
          {bars}
        </span>
      </button>
      <span className={styles.time}>{timeLabel}</span>
    </div>
  )
}
