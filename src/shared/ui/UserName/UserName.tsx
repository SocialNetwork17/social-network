import Link from 'next/link'
import { PATH } from '@/shared/constants/routings'
import styles from './UserName.module.scss'
import { SchemaPostViewModel, SchemaProfileViewModel } from '@/shared/api/schema'
import Card from '../Card/Card'

type Props = {
  post?: SchemaPostViewModel
  userInfo?: SchemaProfileViewModel 
} & (
  | { post: SchemaPostViewModel; userInfo?: never }
  | { userInfo: SchemaProfileViewModel; post?: never }
)

export default function UserName(props: Props) {
  if (props.userInfo) {
    const { userInfo } = props
    return (
      <div className={styles.userInfo}>
        {userInfo?.avatars[0]?.url ? (
          <Card images={userInfo.avatars[0].url} width={36} height={36} variant="circular" />
        ) : (
          <div className={styles.avatarPlaceholder}>
            {(userInfo?.userName.charAt(0) || 'U').toUpperCase()}
          </div>
        )}
        <div>{userInfo?.userName}</div>
      </div>
    )
  } else {
    const { post } = props
    return (
      <Link href={PATH.PROFILE + `/${post.ownerId}`}>
        <div className={styles.userInfo}>
          {post.avatarOwner ? (
            <Card images={post.avatarOwner} width={36} height={36} variant="circular" />
          ) : (
            <div className={styles.avatarPlaceholder}>
              {(post.userName?.charAt(0) || 'U').toUpperCase()}
            </div>
          )}
          <div>{post.userName}</div>
        </div>
      </Link>
    )
  }
}
