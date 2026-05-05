import {Card} from '../Card/Card'
import styles from './ProfileHeader.module.scss'
import {Skeleton} from '../Skeleton/Skeleton'
import {SchemaProfileViewModel, SchemaPublicProfileViewModel} from '@/shared/api/schema'
import {useUserPostsQuery} from '@/shared/api/useUserPostsQuery'
import {Button} from "@/shared/ui/Button/Button";
import {useRouter} from "next/navigation";
import {PATH} from "@/shared/constants/routings";
import {SettingsTabs} from "@/pages/settings/model/tabs.types";

type Props = {
  user: SchemaProfileViewModel | SchemaPublicProfileViewModel
  type: 'profile' | 'friend' | 'user' | 'unauthorized'
}

export const ProfileHeader = (props: Props) => {
  const router = useRouter()

  const { user, type } = props
  const { data: userPosts } = useUserPostsQuery(user.id)

  const onclickHandler = () => {
    router.push(`${PATH.SETTINGS}?part=${SettingsTabs.INFO}`)
  }

  const onSendMessageHandler = () => {
    const query = new URLSearchParams({
      userId: String(user.id),
      username: user.userName,
    })

    router.push(`${PATH.MESSENGER}?${query.toString()}`)
  }

  return (
    <div className={styles.profileContainer}>
      {!user?.avatars.length && <Skeleton width={192} height={192} bordeRadius={96} />}
      {user?.avatars[0]?.url && <Card images={user.avatars[0]?.url} variant="circular"/>}
      <div className={styles.info}>
        <div>
          <h2 style={{ display: 'inline-block' }}>{user?.userName}</h2>
          {type === 'profile' && (
            <div>
              <Button variant={'secondary'}
                      disabled={false}
                      width={167}
                      height={36}
                      onClick={onclickHandler}
              >
                Profile Settings
              </Button>
            </div>
          )}
          {type === 'friend' && (
            <div>
              <button>Unfollow</button>
              <Button variant={'secondary'} disabled={false} width={167} height={36} onClick={onSendMessageHandler}>
                Send Message
              </Button>
            </div>
          )}
          {type === 'user' && (
            <div>
              <button>Follow</button>
              <Button variant={'secondary'} disabled={false} width={167} height={36} onClick={onSendMessageHandler}>
                Send Message
              </Button>
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
            <div>{userPosts?.totalCount || 0}</div>
            <span>Publications</span>
          </div>
        </div>

        {/* <p>{user.aboutMe} </p> */}
      </div>
    </div>
  )
}
