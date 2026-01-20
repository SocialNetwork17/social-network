'use client'
import {Button} from '@/shared/ui/Button/Button'
import {Spinner} from '@/shared/ui/Spinner/Spinner'
import Image from 'next/image'
import confirmCodeImg from '../../../../../public/registrationCodeExpired.svg'
import styles from '@/pages/auth/recoveryCodePage/ui/RecoveryCodePage.module.scss'
import {usePasswordRecoveryMutation} from '@/pages/auth/recoveryCodePage/api/usePasswordRecoveryMutation'
import {useModal} from "@/widgets/modal/model/modal.context";
import {registrationConfirmModalAC} from "@/widgets/modal/model/modal.types";

export const RecoveryCodePage = () => {

  const { mutate: passwordRecovery, isPending } = usePasswordRecoveryMutation()
    const {openModal} = useModal()



  const onClickHandler = () => {
    const email = localStorage.getItem('recoveryEmail')
    if (!email) return
    passwordRecovery(email, {
      onSuccess: () => {
          openModal(registrationConfirmModalAC({
              title: "Email sent",
              email: email,
              description: 'We have sent a link to confirm your email to '}
          ))
      },
    })
  }

  return (
    <div className={styles.recoveryCodePage}>
      <div className={styles.title}>Email verification link expired</div>
      <div className={styles.description}>
        Looks like the verification link has expired. Not to worry, we can send the link again
      </div>
      <div className={styles.buttonContainer}>
        <Button onClick={onClickHandler} variant={'primary'} disabled={false}>
          {isPending && <Spinner />} Resend link
        </Button>
      </div>
      <Image src={confirmCodeImg} alt={'linkExpiredImg'} />
    </div>
  )
}
