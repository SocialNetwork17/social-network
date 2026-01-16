import styles from './CardWithText.module.scss'
import Card from '../Card/Card'
import { SchemaPostViewModel } from '@/shared/api/schema'

type Props = {
  post: SchemaPostViewModel
  onClick?: () => void
}

export default function CardWithText(props: Props) {
  const { post, onClick  } = props

  const urls = post.images.map(image => image.url)
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.card}>
        <Card images={urls} slider={true} />
      </div>
      <div>{post.description}</div>
    </div>
  )
}
