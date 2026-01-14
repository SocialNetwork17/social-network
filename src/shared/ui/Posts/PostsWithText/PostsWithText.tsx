import styles from './PostsWithText.module.scss'
import { SchemaPostViewModel } from '@/shared/api/schema'
import CardWithText from '@/shared/ui/CardWithText/CardWithText'

type Props = {
  posts: SchemaPostViewModel[]
}

export default function PostsWith(props: Props) {
  const { posts } = props

  return (
    <div className={styles.container}>
      {posts.map(el => (
        <CardWithText post={el} key={el.id} />
      ))}
    </div>
  )
}
