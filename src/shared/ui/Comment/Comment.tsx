import styles from './Comment.module.scss'
import { SchemaPostViewModel } from '@/shared/api/schema'
import Card from '../Card/Card'
import { getTimeAgo } from '@/shared/utils/getTimeAgo'
import Link from 'next/link'
import { PATH } from '@/shared/constants/routings'

type Props = {
  post: SchemaPostViewModel
}

export default function Comment(props: Props) {
  const { post } = props

  const dateTime = getTimeAgo(post.createdAt)
  return (
    <div className={styles.container}>
      <Link href={PATH.PROFILE + `/${post.ownerId}`} className={styles.image}>
        {post.avatarOwner ? (
          <Card images={post.avatarOwner} width={36} height={36} variant="circular" />
        ) : (
          <div className={styles.avatarPlaceholder}>
            {(post.userName?.charAt(0) || 'U').toUpperCase()}
          </div>
        )}
      </Link>
      <div>
        <div>
          <Link href={PATH.PROFILE + `/${post.ownerId}`}>
            <span>{post.userName}</span>
          </Link>
          {post.description}
        </div>
        <div className={styles.time}>{dateTime}</div>
      </div>
    </div>
  )
}
