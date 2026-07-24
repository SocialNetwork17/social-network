import styles from './CardFeed.module.scss'
import { Card } from '../Card/Card'
import { SchemaPostViewModel } from '@/shared/api/schema'
import { Comment } from '../Comment/Comment'
import { LikesWithAvatar } from '../LikesWithAvatar/LikesWithAvatar'
import { FeedHeader } from './FeedHeader/FeedHeader'
import { FeedTools } from './FeedTools/FeedTools'
import { CreateComment } from './CreateComment/CreateComment'
import { CommentsBlock } from '../CommentsBlock/CommentsBlock'
import { useAuth } from '@/shared/hooks/useAuth'
import { usePostLikeState } from '@/shared/api/usePostLikeState'
import { useFavoritePostState } from '@/pages/favorites/model/useFavoritePostState'

type Props = {
  postItem: SchemaPostViewModel
  onClick?: () => void
}

export const CardFeed = ({ postItem, onClick }: Props) => {
  const { isAuth } = useAuth()
  const { isLiked, likesCount, avatarWhoLikes, handleLikeClick, isLikePending } = usePostLikeState(postItem)
  const { isFavorite, handleFavoriteClick } = useFavoritePostState(postItem.id)
  const imageSlider = postItem.images.map(image => image.url)

  return (
    <div className={styles.container}>
      <FeedHeader postItem={postItem} />
      <div className={styles.slider}>
        <Card images={imageSlider} slider={true} onClick={onClick} />
      </div>
      <FeedTools
        isLiked={isLiked}
        isFavorite={isFavorite}
        isFavoriteDisabled={!isAuth}
        onFavoriteClick={handleFavoriteClick}
        onLikeClick={handleLikeClick}
        isLikeDisabled={!isAuth || isLikePending}
      />
      <Comment
        createdAt={postItem.createdAt}
        ownerId={postItem.ownerId}
        avatarOwner={postItem.avatarOwner}
        userName={postItem.userName}
        comment={postItem.description}
        likeCount={0}
        postId={postItem.id}
        isLikedByUser={false}
        isPostDescription={true}
      />
      <LikesWithAvatar avatarWhoLikes={avatarWhoLikes} likesCount={likesCount} />
      <CommentsBlock postId={postItem.id}/>
      {isAuth&&<CreateComment postId={postItem.id} variant={"new comment"}/>}
    </div>
  )
}
