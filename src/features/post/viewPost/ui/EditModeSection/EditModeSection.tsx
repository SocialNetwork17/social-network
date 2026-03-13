import React from 'react';
import styles from "@/features/post/viewPost/ui/ImageModalServer.module.scss";
import {Button} from "@/shared/ui/Button/Button";
import {useUpdatePostMutation} from "@/shared/api/useUpdatePostMutation";
import {TextArea} from "@/shared/ui/TextArea/TextArea";
import {ViewModeType} from "@/features/post/viewPost/ui/model/imageModalServer.types";
import {SchemaPostViewModel} from "@/shared/api/schema";
import {useRouter} from "next/navigation";

type Props = {
    imageModalPost: SchemaPostViewModel,
    text: string,
    setViewMode: (viewMode: ViewModeType) => void
    setText: (value: string) => void,
}

export const EditModeSection = ({imageModalPost, setText, text, setViewMode}: Props) => {

    const {mutate: updatePostDescriptionMutation, isPending} = useUpdatePostMutation()
    const router = useRouter()

    const handleSave = () => {
        updatePostDescriptionMutation({
            postId: imageModalPost.id,
            description: text,
        }, {
            onSuccess: () => {
                setViewMode("VIEW_POST")
                router.refresh()
            }
        })
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
                    disabled={isPending || text === imageModalPost.description}
                    width={136}
                    height={36}
                >
                    {isPending ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>
        </div>
    );
};
