import * as React from 'react'
import { UploadErrorModalType } from '@/widgets/modal/model/modal.types'
import styles from './UploadErrorModalContent.module.scss'
import { Button } from '@/shared/ui/Button/Button'
import { useModal } from '@/widgets/modal/model/modal.context'

type Props = {
    modal: UploadErrorModalType
}

export const UploadErrorModalContent = ({ modal }: Props) => {
    const { clearModals } = useModal()

    return (
        <>
            <p className={styles.description}>
                {modal.payload.description}
            </p>

            <div className={styles.buttonsContainer}>
                <Button
                    variant="primary"
                    onClick={clearModals}
                    width={96}
                    height={36}
                    disabled={false}
                >
                    OK
                </Button>
            </div>
        </>
    )
}
