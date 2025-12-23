import Card from '../../Card/Card'
import styles from './PostSimple.module.scss'
import { PostsArray } from '@/entites/profile/userData'

type Props = {
  postsArray: PostsArray[] 
}

export default function PostSimple(props: Props) {
  const { postsArray } = props
  return (
      <div className={styles.postContainer}>
        {postsArray.map((post, index) => (
          <div key={index}>
            <Card images={post.images[0]?.url} />
          </div>
        ))}
      </div>
  )
}
