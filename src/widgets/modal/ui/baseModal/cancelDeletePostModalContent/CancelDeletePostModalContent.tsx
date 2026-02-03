// @flow
import * as React from 'react';
import styles from "./CancelDeletePostModalContent.module.scss"
import { DeletePostModalType} from "@/widgets/modal/model/modal.types";
import {Button} from "@/shared/ui/Button/Button";
import {useModal} from "@/widgets/modal/model/modal.context";
import {useDeletePost} from "@/shared/api/usePostDelete";
import {usePostQuery} from "@/shared/api/usePostQuery";
import {useSnackbar} from "@/widgets/snackbar/model/snackbar.context";


type Props = {
    modal: DeletePostModalType
}

export const CancelDeletePostModalContent = ({modal}: Props) => {
    const {clearModals, popModal} = useModal()

    const deletePostMutation = useDeletePost()
    const { data: postInfo} = usePostQuery(modal.payload.postId)

    const { successSnackbar, errorSnackbar } = useSnackbar()


    const handleDeleteConfirm = async () => {
        try {
            if (postInfo?.id) {
                const response = await deletePostMutation.mutateAsync(postInfo.id)
                clearModals()
                response.response
                successSnackbar('Removal was successful')
                // setIsModalOpen(false)
                // onPostDeleted?.()
            }
        } catch (error) {
            errorSnackbar(JSON.stringify(error))
            console.error('Delete post error:', error)
            //errorSnackbar(error)
        }
    }

    return (
        <>
            <p className={styles.description}>{modal.payload.description}</p>
            <div className={styles.buttonsContainer}>
                <Button variant={'outline'}
                        width={108}
                        height={36}
                        disabled={false}
                        onClick={handleDeleteConfirm}
                >
                    {deletePostMutation.isPending ? 'Deleting...' : 'YES' }
                </Button>
                <Button variant={'primary'}
                        width={108}
                        height={36}
                        disabled={false}
                        onClick={popModal}
                >
                    NO
                </Button>
            </div>
        </>
    )
}