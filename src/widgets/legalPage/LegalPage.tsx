"use client"
import styles from './LegalPage.module.scss'
import {IconButton} from "@/shared/ui/IconButton/IconButton";
import {useRouter} from "next/navigation";

type Props = {
  title: string
  description: string
}

export const LegalPage = ({ title, description }: Props) => {

    const router = useRouter()

    const onClickHandle = () => {
        router.back()
    }

  return (
    <div className={styles.container}>
      <div className={styles.backWrapper}>
          <IconButton  iconId={'arrow-back'} onClick={onClickHandle}/>
        Back
      </div>
      <div className={styles.pageWrapper}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  )
}
