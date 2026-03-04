// @flow
import * as React from 'react';
import styles from "./CancelDeletePostModalContent.module.scss"
import {DeletePostModalType} from "@/widgets/modal/model/modal.types";
import {Button} from "@/shared/ui/Button/Button";
import {useModal} from "@/widgets/modal/model/modal.context";
import {useDeletePost} from "@/shared/api/usePostDelete";
import {usePostQuery} from "@/shared/api/usePostQuery";
import {useSnackbar} from "@/widgets/snackbar/model/snackbar.context";
import {useDeletePostIdFromUrl} from "@/shared/hooks/useDeletePostIdFromUrl";
import {useRouter} from "next/navigation";


type Props = {
    modal: DeletePostModalType
}

export const CancelDeletePostModalContent = ({modal}: Props) => {
    const {clearModals, popModal} = useModal()
    const router = useRouter()

    const deletePostMutation = useDeletePost()
    const { data: postInfo} = usePostQuery(modal.payload.postId)
    const {deletePostIdFromUrl} = useDeletePostIdFromUrl()

    const { successSnackbar} = useSnackbar()


    const handleDeleteConfirm = async () => {
        try {
            if (postInfo?.id) {
                await deletePostMutation.mutateAsync(postInfo.id)
                clearModals()
                deletePostIdFromUrl()
                router.refresh()
                successSnackbar('Removal was successful')
            }
        } catch (error) {
            // const errorStatusCode = getErrorStatusCode(error)
            // const errorMessage = getErrorMessage(error)
            // let finalErrorMessage = 'An error occurred';
            //
            // if (errorStatusCode) {
            //     switch (errorStatusCode) {
            //         case 404:
            //             finalErrorMessage = 'The post has not been found';
            //             break;
            //         case 403:
            //             finalErrorMessage = 'Forbidden';
            //             break;
            //         case 401:
            //             finalErrorMessage = 'Unauthorized';
            //             break;
            //         default:
            //             finalErrorMessage = `Error: ${errorStatusCode}`;
            //             break;
            //     }
            //
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