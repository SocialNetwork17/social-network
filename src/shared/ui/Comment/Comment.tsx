import styles from './Comment.module.scss'
import { SchemaPostViewModel } from '@/shared/api/schema'
import Card from '../Card/Card'
import { getTimeAgo } from '@/shared/utils/getTimeAgo'

type Props = {
  post: SchemaPostViewModel
}

export default function Comment(props: Props) {
  const { post } = props

  const dateTime = getTimeAgo(post.createdAt)
  return (
    <div className={styles.container}>
        <div className={styles.image}> {post.avatarOwner ? (
        <Card images={post.avatarOwner} width={36} height={36} variant="circular" />
      ) : (
        <div className={styles.avatarPlaceholder}>
          {(post.userName?.charAt(0) || 'U').toUpperCase()}
        </div>
      )}</div>   
      <div>
        <div><span>{post.userName}</span> {post.description}</div>
        <div className={styles.time}>{dateTime}</div>
      </div>
    </div>
  )
}
