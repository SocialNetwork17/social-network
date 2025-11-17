import { postsData } from '@/entites/profile/userData'
import styles from './MainPage.module.scss'
import CardWithText from '@/shared/ui/CardWithText/CardWithText'

export default function MainPage() {
  return (
    <div className={styles.container}>
      <div>
        <div>Registered users:</div>
        <div>009213</div>
      </div>
      <div>
        {postsData.map(el => (
          <CardWithText user={el} key={el.id}/>
        ))}
      </div>
    </div>
  )
}
