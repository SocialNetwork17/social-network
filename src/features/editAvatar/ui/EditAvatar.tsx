import React from 'react';
import {Button} from "@/shared/ui/Button/Button";
import {useModal} from "@/widgets/modal/model/modal.context";
import {deleteAvatarModalAC, openUploadAvatarModalAC} from "@/widgets/modal/model/modal.types";
import {Card} from "@/shared/ui/Card/Card";
import {useProfileQuery} from "@/features/editAvatar/lib/useProfileQuery";
import {Skeleton} from "@/shared/ui/Skeleton/Skeleton";
import {IconButton} from "@/shared/ui/IconButton/IconButton";
import {useDeleteAvatarMutation} from "@/features/editAvatar/lib/useDeleteAvatarMutation";
import s from './EditAvatar.module.scss'
import {Icon} from "@/shared/ui/Icon/Icon";

export const EditAvatar = () => {

    const {data: profile, isLoading} = useProfileQuery()
    const {mutate: deleteAvatar, isPending: isDeleting} = useDeleteAvatarMutation()


    const {pushModal} = useModal()

    const handleOpenAvatarModal = () => {
        pushModal(
            openUploadAvatarModalAC({
                title: "Add a Profile Photo"
            })
        )
    }

    const handleDeleteClick = () => {
        pushModal(
            deleteAvatarModalAC({
                title: "Delete Avatar",
                description: "Are you sure you want to delete your profile photo?",
            })
        )
    }


    const avatarUrl = profile?.avatars?.[0]?.url

    return (
        <div className={s.setAvatar}>

            {isLoading ? (
                <Skeleton width={192} height={192} bordeRadius={96}/>
            ) : avatarUrl ? (
                <>
                    <Card
                        images={avatarUrl}
                        variant="circular"
                        width={192}
                        height={192}
                    />
                    <div className={s.deleteAvatarButton}>
                        <IconButton iconId={'deleteAvatar'}
                                    size={18}
                                    onClick={handleDeleteClick}
                                    disabled={isDeleting}
                        />
                    </div>
                </>
            ) : (
                <div className={s.iconWrapper}>
                    <Icon iconId='create-post-icon' size={48} fill='white' viewBox='0 0 48 48' />
                </div>
            )}

            <Button
                variant={'outline'}
                onClick={handleOpenAvatarModal}
                disabled={false}
            >
                Select Profile Photo
            </Button>

        </div>
    );
};
