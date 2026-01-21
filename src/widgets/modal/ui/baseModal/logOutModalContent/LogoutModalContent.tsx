import {useModal} from "@/widgets/modal/model/modal.context";
import {useLogoutMutation} from "@/widgets/sidebar/api/useLogoutMutation";
import styles from "@/widgets/modal/ui/baseModal/logOutModalContent/LogOutModalContent.module.scss";
import {Button} from "@/shared/ui/Button/Button";
import {LogOutModalType} from "@/widgets/modal/model/modal.types";


type LogOutModal = {
    modal: LogOutModalType
}

export const LogoutModalContent = (props: LogOutModal) => {
    const {modal} = props

    const {clearModals} = useModal()

    const logoutMutation = useLogoutMutation()


    const handleLogoutConfirm = () => {
        logoutMutation.mutate()
        clearModals()
    }

    const handleLogoutClose = () => {
        clearModals()
    }
    return (
        <>
            <p className={styles.description}>
                {modal.payload.description}
                "<span className={styles.descriptionBold}>{modal.payload.email}</span>"?
            </p>
            <div className={styles.buttonsContainer}>
                <Button
                    variant={'outline'}
                    width={96}
                    height={36}
                    disabled={false}
                    onClick={handleLogoutConfirm}
                >
                    Yes
                </Button>
                <Button
                    variant={'primary'}
                    width={96}
                    height={36}
                    disabled={false}
                    onClick={handleLogoutClose}
                >
                    No
                </Button>
            </div>
        </>
    )
}