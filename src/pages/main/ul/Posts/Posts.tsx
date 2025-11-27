import styles from './Posts.module.scss'
import { postsData } from '@/entites/profile/userData'
import CardWithText from '@/shared/ui/CardWithText/CardWithText'

export default function Posts() {
  const posts = postsData //приходят данные с backend

  return (
    <div className={styles.container}>
      {posts.map(el => (
        <CardWithText user={el} key={el.id} />
      ))}
    </div>
  )
}
