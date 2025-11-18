import { postsData } from '@/entites/profile/userData'
import styles from './MainPage.module.scss'
import CardWithText from '@/shared/ui/CardWithText/CardWithText'

export default function MainPage() {
  const totalRegisteredUser = '009213' //приходят данные с backend
  const arrayTotalUser = totalRegisteredUser.split('')
  
  return (
    <div className={styles.container}>
      <div>
        <div>Registered users:</div>
        <div>
          {arrayTotalUser.map((el, index) => (
            <span key={index}>{el}</span>
          ))}
        </div>
      </div>
      <div>
        {postsData.map(el => (
          <CardWithText user={el} key={el.id} />
        ))}
      </div>
    </div>
  )
}
