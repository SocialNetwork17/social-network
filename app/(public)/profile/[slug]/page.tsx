import { getProfileServer } from '@/pages/profile/api/getProfileServer'
import { Profile } from '@/pages/profile/ui/Profile'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export const revalidate = 300

export default async function UserProfile({ params }: PageProps) {
  const { slug } = await params
  const userId = Number(slug)

  const [profileInfo] = await Promise.all([getProfileServer(userId)])

  return <Profile profileInfo={profileInfo} />
}
