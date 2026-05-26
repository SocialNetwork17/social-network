import styles from './CommentsInfinity.module.scss'
import { Comment } from '../../Comment/Comment'
import { SchemaAnswersViewModel, SchemaCommentsViewModel } from '@/shared/api/schema'

type Props = {
  comments: SchemaCommentsViewModel[] | SchemaAnswersViewModel []
  customStyle?: React.CSSProperties
  postId: number
}

export const CommentsInfinity = ({ comments, customStyle, postId }: Props) => {
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
                likeCount={comment.likeCount}
                postId={postId}
                commentId={comment.id}
              />
            </div>
          ))}
        </div>
  )
}
