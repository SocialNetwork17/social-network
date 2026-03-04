import {Card} from '../Card/Card'
import styles from './ProfileHeader.module.scss'
import {Skeleton} from '../Skeleton/Skeleton'
import {SchemaProfileViewModel, SchemaPublicProfileViewModel} from '@/shared/api/schema'
import {Button} from "@/shared/ui/Button/Button";
import {useRouter} from "next/navigation";
import {PATH} from "@/shared/constants/routings";
import {SettingsTabs} from "@/pages/settings/model/tabs.types";

type Props = {
  user: SchemaProfileViewModel | SchemaPublicProfileViewModel
  type: 'profile' | 'friend' | 'user' | 'unauthorized'
  publicationCount: number
}

export const ProfileHeader = ({user, type, publicationCount}: Props) => {
  const router = useRouter()


  const onclickHandler = () => {
    router.push(`${PATH.SETTINGS}?part=${SettingsTabs.INFO}`)
  }

  return (
    <div className={styles.profileContainer}>
      {!user?.avatars.length && <Skeleton width={192} height={192} borderRadius={96} />}
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
            <div>{publicationCount || 0}</div>
            <span>Publications</span>
          </div>
        </div>

        {/* <p>{user.aboutMe} </p> */}
      </div>
    </div>
  )
}
