import styles from './CardWithText.module.scss'
import Card from '../Card/Card'
import { SchemaPostViewModel } from '@/shared/api/schema'
import Link from 'next/link'
import { PATH } from '@/shared/constants/routings'
import Skeleton from '../Skeleton/Skeleton'
import { useEffect, useRef, useState } from 'react'
import { getTimeAgo } from '@/shared/utils/getTimeAgo'

type Props = {
  post: SchemaPostViewModel
  onClick?: () => void
}

export default function CardWithText(props: Props) {
  const { post, onClick } = props

  const [isExpanded, setIsExpanded] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkHeight = () => {
      const charCount = post.description.length
      const needsExpansion = charCount > 120
      if (isExpanded) {
        setShowButton(true)
      } else {
        setShowButton(needsExpansion)
      }
    }
    checkHeight()
  }, [post.description, isExpanded])

  const urls = post.images.map(image => image.url)
  const dateTime = getTimeAgo(post.createdAt)
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Card images={urls} slider={true} onClick={onClick} />
      </div>
      <Link href={PATH.PROFILE + `/${post.ownerId}`}>
        <div className={styles.userInfo}>
          {post.avatarOwner ? (
            <Card images={post.avatarOwner} width={36} height={36} variant="circular" />
          ) : (
            <Skeleton width={36} height={36} bordeRadius={18} />
          )}
          <div>{post.userName}</div>
        </div>
      </Link>
      <div className={styles.postDesc}>
        <div className={styles.time}>{dateTime}</div>
        <div className={styles.textContainer}>
          <span ref={textRef} className={`${styles.text} ${isExpanded ? styles.expanded : ''}`}>
            {post.description}
          </span>
          {showButton && (
            <button onClick={() => setIsExpanded(!isExpanded)} className={styles.buttonInline}>
               {isExpanded ? 'Hide' : 'Show more'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
