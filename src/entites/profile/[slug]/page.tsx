import styles from './page.module.css'
import { useParams } from 'next/navigation'

export default function Home() {
  const params = useParams()
  // const userId = params?.slug
  // const { data: user } = useDataCurrentProfileQuery(userId) позже будет хук

  if (true) {
    return <div>User not found</div>
  }

  return (
      <div className={styles.page}>
        {/* <MyProfile/>  можно расширить/переименовать компоненту если пробросить пропс с id*/}
      </div>
  )
}
