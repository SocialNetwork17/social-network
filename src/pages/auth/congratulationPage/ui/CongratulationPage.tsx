'use client'
import styles from './Congratulation.module.scss'
import { Button } from '@/shared/ui/Button/Button'
import Image from 'next/image'
import congratulationImg from '../../../../../public/congratulation.svg'
import Link from 'next/link'
import { PATH } from '@/shared/constants/routings'

export const CongratulationPage = () => {
  return (
    <div className={styles.congratulationPage}>
      <div className={styles.title}>Congratulations!</div>
      <div className={styles.description}>Your email has been confirmed</div>
      <div className={styles.buttonContainer}>
        <Link href={PATH.SIGN_IN}>
          <Button variant="primary" disabled={false}>
            Sign In
          </Button>
        </Link>
      </div>
      <Image src={congratulationImg} alt={'congratulation picture'} />
    </div>
  )
}
