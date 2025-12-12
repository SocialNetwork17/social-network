'use client'

import styles from './CreateNewPasswordPage.module.scss'
import {Input} from "@/shared/ui/Input/Input";
import {Button} from "@/shared/ui/Button/Button";
import {useForm} from "react-hook-form";
import {SchemaNewPasswordInputDto,} from "@/shared/api/schema";
import {useMutation} from "@tanstack/react-query";
import {client} from "@/shared/api/client";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {PATH} from "@/shared/constants/routings";
import {useRouter, useSearchParams} from 'next/navigation';

// Схема валидации для создания нового пароля
const newPasswordSchema = z.object({
    newPassword: z.string()
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password must be at most 20 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/\d/, 'Password must contain at least one number')
        .regex(
            /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
            'Password must contain at least one special character'
        ),
    confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
});

type NewPasswordFormData = z.infer<typeof newPasswordSchema>;

type ApiError = {
    statusCode?: number;
    messages?: Array<{
        message?: string;
        field?: string;
    }>;
    error?: string;
}

export const CreateNewPasswordPage = () => {

    const router = useRouter()
    const searchParams = useSearchParams()

    // Получаем параметры из URL на клиенте
    const recoveryCode = searchParams ? searchParams.get('code') : null

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting, isValid },
        reset,
    } = useForm<NewPasswordFormData >({
            resolver: zodResolver(newPasswordSchema),
            mode: 'onChange', // Валидация при изменении полей
            defaultValues: {
                newPassword: '',
                confirmPassword: ''
            }
        })

    const {mutate, isPending} = useMutation({
        mutationFn: async (data: SchemaNewPasswordInputDto) => {
            if (!recoveryCode) {
                throw new Error('Recovery code is missing');
            }

            const response = await client.POST('/api/v1/auth/new-password', {
                body: {
                    newPassword: data.newPassword,
                    recoveryCode: recoveryCode,
                }
            })
            if (response.error) {
                // Бросаем ошибку с полной структурой ответа
                throw response.error as unknown;
            }
            return response.data
        },
        onSuccess: () => {
            reset();

            setTimeout(() => {
                router.push(PATH.SIGN_IN);
            }, 3000);
        },
        onError: (error: unknown) => {
            console.error('Recovery error:', error);

            if (error && typeof error === 'object') {
                const apiError = error as ApiError;

                console.log('API Error details:', apiError);

                if (apiError.statusCode === 400 && apiError.messages) {
                    apiError.messages.forEach((errMsg) => {
                        if (errMsg.message === 'Password recovery code is invalid') {
                            router.push(PATH.LINK_EXPIRED);
                            return;
                        }
                    });
                }
            }
        }
    })

    const onSubmit = (data: NewPasswordFormData) => {
        if (!recoveryCode) {
            return;
        }

        mutate({
            newPassword: data.newPassword,
            recoveryCode: recoveryCode
        });
    }

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
                    disabled={isPending || isSubmitting || !isValid || !recoveryCode}
                >
                    Create new password
                </Button>
            </form>

        </div>
    )
}