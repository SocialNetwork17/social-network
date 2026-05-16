import {Card} from '../Card/Card'
import styles from './ProfileHeader.module.scss'
import {Skeleton} from '../Skeleton/Skeleton'
import {SchemaProfileViewModel, SchemaPublicProfileViewModel} from '@/shared/api/schema'
import {Button} from "@/shared/ui/Button/Button";
import {useRouter} from "next/navigation";
import {PATH} from "@/shared/constants/routings";
import {SettingsTabs} from "@/pages/settings/model/tabs.types";
// import {useMemo, useState} from "react";
// import {useFollowUserMutation} from "@/features/followUser/api/useFollowUserMutation";
// import {useUnfollowUserMutation} from "@/features/followUser/api/useUnfollowUserMutation";

type Props = {
  user: SchemaProfileViewModel | SchemaPublicProfileViewModel
  type: 'profile' | 'friend' | 'user' | 'unauthorized'
  publicationCount: number
}

export const ProfileHeader = ({user, type, publicationCount}: Props) => {
  const router = useRouter()
  // const followMutation = useFollowUserMutation()
  // const unfollowMutation = useUnfollowUserMutation()
  //
  // const [isFollowing, setIsFollowing] = useState<boolean>(!!('isFollowing' in user && user.isFollowing))
  // const [followersCount, setFollowersCount] = useState<number>(
  //   'userMetadata' in user ? user.userMetadata.followers : 0,
  // )
  // const [followingCount, setFollowingCount] = useState<number>(
  //   'userMetadata' in user ? user.userMetadata.following : 0,
  // )
  //
  // const isLoadingFollowAction = followMutation.isPending || unfollowMutation.isPending
  //
  // const aboutMeText = useMemo(() => {
  //   if ('aboutMe' in user && user.aboutMe) {
  //     return user.aboutMe
  //   }
  //
  //   return null
  // }, [user])


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

  // const onFollowToggle = async () => {
  //   if (!(type === 'user' || type === 'friend')) {
  //     return
  //   }
  //
  //   if (isFollowing) {
  //     await unfollowMutation.mutateAsync({userId: user.id})
  //     setIsFollowing(false)
  //     setFollowersCount(prev => Math.max(prev - 1, 0))
  //
  //     return
  //   }
  //
  //   await followMutation.mutateAsync({selectedUserId: user.id})
  //   setIsFollowing(true)
  //   setFollowersCount(prev => prev + 1)
  // }

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
          {/*{(type === 'friend' || type === 'user') && (*/}
          {/*    <div>*/}
          {/*      <Button*/}
          {/*          variant={isFollowing ? 'secondary' : 'primary'}*/}
          {/*          disabled={isLoadingFollowAction}*/}
          {/*          width={120}*/}
          {/*          height={36}*/}
          {/*          onClick={onFollowToggle}*/}
          {/*      >*/}
          {/*        {isFollowing ? 'Unfollow' : 'Follow'}*/}
          {/*      </Button>*/}
          {/*      <button>Send Message</button>*/}
          {/*    </div>*/}
          {/*)}*/}
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
            {/*<div>{followingCount}</div>*/}
            <div>{2218}</div>
            <span>Following</span>
          </div>
          <div>
            {/*<div>{followersCount}</div>*/}
            <div>{2358}</div>
            <span>Followers</span>
          </div>
          <div>
            <div>{publicationCount || 0}</div>
            <span>Publications</span>
          </div>
        </div>
        {/*{aboutMeText && <p>{aboutMeText}</p>}*/}
        {/* <p>{user.aboutMe} </p> */}
      </div>
    </div>
  )
}
