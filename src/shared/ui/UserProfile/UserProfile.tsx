import { User } from '@/entites/profile/userData'
import styles from './UserProfile.module.css'
import Card from '../Card/Card'

interface Props {
  user: User
  type: 'profile' | 'friend' | 'user'
}

export default function UserProfile(props: Props) {
  const { user, type } = props

  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <Card images={user.userPhoto} />
        <div className={styles.userInfo}>
          <div className={styles.userNavigation}>
            <h2 style={{ display: 'inline-block' }}>{user.userName}</h2>
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
          <div className={styles.userProfileInfo}>
            <div>
              <div>{user.following}</div>
              <span>Following</span>
            </div>
            <div>
              <div>{user.followers}</div>
              <span>Followers</span>
            </div>
            <div>
              <div>{user.publications}</div>
              <span>Publications</span>
            </div>
          </div>

          <p>{user.aboutYourself} </p>
        </div>
      </div>
      <div className={styles.postContainer}>
        {user.posts.map((post, index) => (
          <div key={index} className={styles.postImage}>
            <Card images={post} />
          </div>
        ))}
      </div>
    </div>
  )
}
