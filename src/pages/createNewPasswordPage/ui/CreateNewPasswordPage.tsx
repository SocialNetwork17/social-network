'use client'

import styles from './CreateNewPasswordPage.module.scss'
import {Input} from "@/shared/ui/Input/Input";
import {Button} from "@/shared/ui/Button/Button";
import { useCreateNewPassword } from '../model/useCreateNewPassword';

export const CreateNewPasswordPage = () => {

    const {
        errors,
        isPending,
        isSubmitting,
        recoveryCode,
        canSubmit,
        handleSubmit,
        register,
        onSubmit,
        buttonText,
    } = useCreateNewPassword();

    return (
        <div className={styles.CreateNewPasswordPage}>
            <h2 className={styles.title}>Create New Password</h2>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputsWrapper}>
                    <Input
                        {...register('newPassword')}
                        errorText={errors.newPassword?.message}
                        error={!!errors.newPassword}
                        label={'New password'}
                        type={'password'}
                        placeholder={'******************'}
                        required={false}
                        disabled={isPending || isSubmitting}
                    />
                    <Input
                        {...register('confirmPassword')}
                        errorText={errors.confirmPassword?.message}
                        error={!!errors.confirmPassword}
                        label={'Password confirmation'}
                        type={'password'}
                        placeholder={'******************'}
                        required={false}
                        disabled={isPending || isSubmitting}
                    />

                </div>
                <p className={styles.text}>Your password must be between 6 and 20 characters</p>

                <Button
                    variant={'primary'}
                    type="submit"
                    disabled={!canSubmit || !recoveryCode}
                >
                    {buttonText}
                </Button>
            </form>

        </div>
    )
}