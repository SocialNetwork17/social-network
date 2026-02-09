import { Button } from "@/shared/ui/Button/Button"
import { useDeleteAvatarMutation } from "@/features/editAvatar/lib/useDeleteAvatarMutation"
import { useModal } from "@/widgets/modal/model/modal.context"
import { DeleteAvatarModalType } from "@/widgets/modal/model/modal.types"
import s from "./DeleteAvatarModalContent.module.scss"

type Props = {
    modal: DeleteAvatarModalType
}

export const DeleteAvatarModalContent = ({ modal }: Props) => {
    const { popModal } = useModal()
    const { mutate: deleteAvatar, isPending } = useDeleteAvatarMutation()

    const handleDelete = () => {
        deleteAvatar(undefined, {
            onSuccess: () => popModal(),
        })
    }

    return (
        <div className={s.wrapper}>
            <p className={s.text}>{modal.payload.description}</p>

            <div className={s.buttons}>

                <Button
                    variant="outline"
                    onClick={handleDelete}
                    disabled={isPending}
                >
                    {isPending ? 'Deleting...' : 'Yes'}
                </Button>

                <Button variant="primary" onClick={popModal} disabled={isPending}>
                    No
                </Button>

            </div>
        </div>
    )
}
