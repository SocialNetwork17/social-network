import React from 'react';
import styles from "@/features/post/viewPost/ui/ImageModalClient.module.scss";
import {Button} from "@/shared/ui/Button/Button";
import {openViewPostModalAC} from "@/widgets/modal/model/modal.types";
import {useUpdatePostMutation} from "@/shared/api/useUpdatePostMutation";
import {useModal} from "@/widgets/modal/model/modal.context";
import {usePostQuery} from "@/shared/api/usePostQuery";
import {TextArea} from "@/shared/ui/TextArea/TextArea";

type Props = {
    postId: number,
    text: string,
    setText: (value: string) => void,
}

export const EditModeSection = ({postId, setText, text}: Props) => {


    const {mutateAsync, isPending} = useUpdatePostMutation()

    const {data: postInfo} = usePostQuery(postId);

    const {pushModal, clearModals} = useModal()


    const handleSave = async () => {
        try {
            await mutateAsync({
                postId: postInfo!.id,
                description: text,
            })
            clearModals()
            pushModal(openViewPostModalAC({postId: postInfo!.id}))
        } catch (error) {
            console.error('Failed to update post:', error)
        }
    }


    return (
        <div className={styles.editSection}>


            <p className={styles.helpText}>
                Add publication descriptions
            </p>
            <TextArea
                label={""}
                value={text} // Здесь будет старый текст поста
                onChange={(val) => setText(val)} // Здесь получаем новую строку
                placeholder={'Add text'}
            />


            <div className={styles.saveButton}>
                <Button
                    variant={'primary'}
                    onClick={handleSave}
                    disabled={isPending || text === postInfo?.description}
                    width={136}
                    height={36}
                >
                    {isPending ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>
        </div>
    );
};
