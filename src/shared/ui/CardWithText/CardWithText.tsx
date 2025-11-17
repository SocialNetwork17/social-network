import { Post } from '@/entites/profile/userData'
import Card from '../Card/Card'

interface Props {
  user: Post
}

export default function CardWithText(props: Props) {
  const { user } = props

  const urls = user.images.map(image => image.url)
  return (
    <div>
      <Card images={urls} slider={true} height={user.images[0].width} width={user.images[0].width}/>
      <div>{user.userName}</div>
    </div>
  )
}
