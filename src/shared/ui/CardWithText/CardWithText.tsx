import styles from './CardWithText.module.scss'
import { Post } from '@/entites/profile/userData'
import Card from '../Card/Card'

type Props = {
  user: Post
}

export default function CardWithText(props: Props) {
  const { user } = props

  const urls = user.images.map(image => image.url)
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Card images={urls} slider={true} />
      </div>
      <div>{user.description}</div>
    </div>
  )
}
