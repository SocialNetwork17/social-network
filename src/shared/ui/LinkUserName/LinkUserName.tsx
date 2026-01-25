import Link from 'next/link'
import { PATH } from '@/shared/constants/routings'
import styles from './LinkUserName.module.scss'
import { SchemaPostViewModel } from '@/shared/api/schema'
import Card from '../Card/Card'

type Props = {
  post: SchemaPostViewModel
}

export default function LinkUserName(props: Props) {
  const { post } = props
  return (
    <Link href={PATH.PROFILE + `/${post.ownerId}`}>
      <div className={styles.userInfo}>
        {post.avatarOwner ? (
          <Card images={post.avatarOwner} width={36} height={36} variant="circular" />
        ) : (
          <div className={styles.avatarPlaceholder}>
            {(post.userName?.charAt(0) || 'U').toUpperCase()}
          </div>
        )}
        <div>{post.userName}</div>
      </div>
    </Link>
  )
}
