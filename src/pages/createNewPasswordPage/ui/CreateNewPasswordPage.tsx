'use client'

import styles from './CreateNewPasswordPage.module.scss'
import {Input} from "@/shared/ui/Input/Input";
import {Button} from "@/shared/ui/Button/Button";
import {useForm} from "react-hook-form";
import {SchemaNewPasswordInputDto } from "@/shared/api/schema";
import {useMutation} from "@tanstack/react-query";
import {client} from "@/shared/api/client";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useEffect, useState} from "react";
import { useSearchParams } from 'next/navigation';
import {useRouter} from "next/router";

// Схема валидации для создания нового пароля
const newPasswordSchema = z.object({
    newPassword: z.string()
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password must be at most 20 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/\d/, 'Password must contain at least one number'),
    confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
});

type NewPasswordFormData = z.infer<typeof newPasswordSchema>;

export const CreateNewPasswordPage = () => {
    const [recoveryCode, setRecoveryCode] = useState<string | null>(null);
    const [apiError, setApiError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    // Получаем параметры из URL на клиенте
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

        // Используем setTimeout для отложенного обновления состояния
        const timer = setTimeout(() => {
            if (!code) {
                setApiError('Invalid or missing recovery code');
            } else {
                setRecoveryCode(code);
            }
            setIsLoading(false);
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting, isValid },
        reset,
        watch
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
                throw response.error;
            }
            return response.data
        },
        onSuccess: () => {
            setIsSuccess(true);
            setApiError(null);
            reset();

            setTimeout(() => {
                // Используем window.location для редиректа
                window.location.href = '/login';
            }, 3000);
        },
        onError: (error: Error) => {
            setApiError(error.message);

            // Если сервер возвращает специфические ошибки для полей:
            // if (error.response?.data?.errors) {
            //     Object.entries(error.response.data.errors).forEach(([field, message]) => {
            //         setError(field as keyof NewPasswordFormData, {
            //             type: 'server',
            //             message: message as string
            //         });
            //     });
            // }
        }
    })

    const onSubmit = (data: NewPasswordFormData) => {
        if (!recoveryCode) {
            setApiError('Recovery code is missing. Please use the link from your email.');
            return;
        }

        setApiError(null);
        mutate({
            newPassword: data.newPassword,
            recoveryCode: recoveryCode
        });
    }

    // Отслеживаем значения для динамической валидации
    const newPasswordValue = watch('newPassword');
    const confirmPasswordValue = watch('confirmPassword');


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
                        placeholder={'Enter new password'}
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
                <div className={styles.validationRules}>
                    <p className={styles.text}>Your password must:</p>
                    <ul className={styles.rulesList}>
                        <li className={newPasswordValue?.length >= 6 && newPasswordValue?.length <= 20 ? styles.valid : ''}>
                            Be between 6 and 20 characters
                        </li>
                        <li className={/[A-Z]/.test(newPasswordValue || '') ? styles.valid : ''}>
                            Contain at least one uppercase letter
                        </li>
                        <li className={/[a-z]/.test(newPasswordValue || '') ? styles.valid : ''}>
                            Contain at least one lowercase letter
                        </li>
                        <li className={/\d/.test(newPasswordValue || '') ? styles.valid : ''}>
                            Contain at least one number
                        </li>
                        <li className={newPasswordValue === confirmPasswordValue && newPasswordValue ? styles.valid : ''}>
                            Passwords must match
                        </li>
                    </ul>
                </div>
                <Button
                    variant={'primary'}
                    type="submit"
                    disabled={isPending || isSubmitting || !isValid}
                >
                    Create new password
                </Button>
            </form>

        </div>
    )
}