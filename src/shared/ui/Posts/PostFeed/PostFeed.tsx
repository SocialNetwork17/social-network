import { SchemaPostViewModel } from '@/shared/api/schema'
import { CardFeed } from '../../CardFeed/CardFeed'
import styles from './PostFeed.module.scss'

type Props = {
  posts: SchemaPostViewModel[]
  onPostClick?: (id: number) => void
}

export const PostFeed = ({ posts, onPostClick }: Props) => {
  return (
    <div className={styles.postContainer}>
      {posts.map(post => (
        <div key={post.id} onClick={() => onPostClick?.(post.id)}>
          <CardFeed postItem={post} />
        </div>
      ))}
    </div>
  )
}