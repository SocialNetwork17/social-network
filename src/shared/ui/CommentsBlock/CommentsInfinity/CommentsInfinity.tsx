import styles from './CommentsInfinity.module.scss'
import { Comment } from '../../Comment/Comment'
import { SchemaCommentsViewModel } from '@/shared/api/schema'

type Props = {
  comments: SchemaCommentsViewModel[]
  customStyle?: React.CSSProperties
}

export const CommentsInfinity = ({ comments, customStyle }: Props) => {
  return (
        <div className={styles.comments} style={customStyle}>
          {comments?.map(comment => (
            <div key={comment.id}>
              <Comment
                createdAt={comment.createdAt}
                ownerId={comment.from.id}
                avatarOwner={comment.from.avatars?.[0]?.url || null}
                userName={comment.from.username}
                comment={comment.content}
              />
            </div>
          ))}
        </div>
  )
}
