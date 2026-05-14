import styles from './CardFeed.module.scss'
import { Card } from '../Card/Card'
import { SchemaPostViewModel } from '@/shared/api/schema'
import { Comment } from '../Comment/Comment'
import { LikesWithAvatar } from '../LikesWithAvatar/LikesWithAvatar'
import { FeedHeader } from './FeedHeader/FeedHeader'
import { FeedTools } from './FeedTools/FeedTools'
import { CreateComment } from './CreateComment/CreateComment'
import { CommentsBlock } from '../CommentsBlock/CommentsBlock'

type Props = {
  postItem: SchemaPostViewModel
  onClick?: () => void
}

export const CardFeed = ({ postItem, onClick }: Props) => {
  const imageSlider = postItem.images.map(image => image.url)

  return (
    <div className={styles.container}>
      <FeedHeader postItem={postItem} />
      <div className={styles.slider}>
        <Card images={imageSlider} slider={true} onClick={onClick} />
      </div>
      <FeedTools />
      <Comment createdAt={postItem.createdAt} ownerId={postItem.ownerId} avatarOwner={postItem.avatarOwner} userName={postItem.userName} comment={postItem.description}/>
      <LikesWithAvatar avatarWhoLikes={postItem.avatarWhoLikes} likesCount={postItem.likesCount} />
      <CommentsBlock postId={postItem.id}/>
      <CreateComment postId={postItem.id}/>
    </div>
  )
}
