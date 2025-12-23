import { Profile } from '@/entites/profile/userData'
import Card from '../../Card/Card'
import styles from './ProfileHeader.module.scss'
import Skeleton from '../../Skeleton/Skeleton'

//тут нужно с типами разобраться как корректно пропсы поубирать из общих компонентов
type Props = {
  user: Profile | null | undefined
  type: 'profile' | 'friend' | 'user' | 'unauthorized'
}

export default function ProfileHeader(props: Props) {
  const { user, type } = props
  return (
    <div className={styles.profileContainer}>
      {!user?.avatars.length&&<Skeleton width={192} height={192} bordeRadius={96}/>}
      {/* {user?.avatars.length && <Card images={user.avatars[0]?.url} />} */}
      <div className={styles.info}>
        <div>
          <h2 style={{ display: 'inline-block' }}>{user?.userName}</h2>
          {type === 'profile' && (
            <div>
              <button>Profile Settings</button>
            </div>
          )}
          {type === 'friend' && (
            <div>
              <button>Unfollow</button>
              <button>Send Message</button>
            </div>
          )}
          {type === 'user' && (
            <div>
              <button>Follow</button>
              <button>Send Message</button>
            </div>
          )}
        </div>
        <div>
          <div>
            <div>{2218}</div>
            <span>Following</span>
          </div>
          <div>
            <div>{2358}</div>
            <span>Followers</span>
          </div>
          <div>
            <div>{2764}</div>
            <span>Publications</span>
          </div>
        </div>

        {/* <p>{user.aboutMe} </p> */}
      </div>
    </div>
  )
}
