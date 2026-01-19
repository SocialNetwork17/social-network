import styles from './CardWithText.module.scss'
import Card from '../Card/Card'
import { SchemaPostViewModel } from '@/shared/api/schema'
import Link from 'next/link'
import { PATH } from '@/shared/constants/routings'
import Skeleton from '../Skeleton/Skeleton'
import { Button } from '@headlessui/react'
import { useState } from 'react'

type Props = {
  post: SchemaPostViewModel
  onClick?: () => void
}

export default function CardWithText(props: Props) {
  const { post, onClick } = props

  const [isExpanded, setIsExpanded] = useState(false)

  const urls = post.images.map(image => image.url)
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
        <div className={`${styles.text} ${isExpanded ? styles.expanded : ''}`}>
          {post.description}
        </div>
        {!isExpanded && (
          <button onClick={() => setIsExpanded(true)} className={styles.showMoreBtn}>
            Show more
          </button>
        )}
        {isExpanded && (
          <button onClick={() => setIsExpanded(false)} className={styles.showMoreBtn}>
            Hide
          </button>
        )}
      </div>
    </div>
  )
}
