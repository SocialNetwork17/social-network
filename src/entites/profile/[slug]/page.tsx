'use client'

import styles from './page.module.css'
import { useParams } from 'next/navigation'
// import UserProfile from '@/shared/ui/UserProfile/UserProfile'

export default function Home() {
  const params = useParams()
  // const userId = params.slug
  // const user = usersData[userId]

  return (
    <div className={styles.page}>
      {/* <UserProfile user={user} type="profile" /> */}
    </div>
  )
}
