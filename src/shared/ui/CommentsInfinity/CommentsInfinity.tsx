import styles from './CommentsInfinity.module.scss'
import { Button } from '../Button/Button'
import { useCommentsQuery } from '@/shared/api/useCommentsQuery'

type Props = {
  postId: number
}

export const CommentsInfinity = ({ postId }: Props) => {
    const { data: comments} = useCommentsQuery(postId)

  const handleOpenComment = () => {}

  return (
    <div className={styles.container}>

      <Button variant="underline" onClick={handleOpenComment} disabled={false}>
        View All Comments ({comments?.totalCount})
      </Button>

    </div>
  )
}
