import styles from './CardWithText.module.scss'
import Card from '../Card/Card'
import { SchemaPostViewModel } from '@/shared/api/schema'
import LinkUserName from '../LinkUserName/LinkUserName'
import ExpandText from './ExpandText/ExpandText'

type Props = {
  post: SchemaPostViewModel
  onClick?: () => void
}

export default function CardWithText(props: Props) {
  const { post, onClick } = props

  const urls = post.images.map(image => image.url)
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Card images={urls} slider={true} onClick={onClick} />
      </div>
      <LinkUserName post={post} />
      <ExpandText post={post} />
    </div>
  )
}
