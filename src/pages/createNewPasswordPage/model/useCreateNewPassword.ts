// hooks/use-create-new-password.ts
'use client'

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useSearchParams } from 'next/navigation';
import { client } from "@/shared/api/client";
import { SchemaNewPasswordInputDto } from "@/shared/api/schema";
import { PATH } from "@/shared/constants/routings";

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

export const useCreateNewPassword = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Получаем параметры из URL на клиенте
    const recoveryCode = searchParams ? searchParams.get('code') : null;

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting, isValid },
        reset,
    } = useForm<NewPasswordFormData>({
        resolver: zodResolver(newPasswordSchema),
        mode: 'onChange',
        defaultValues: {
            newPassword: '',
            confirmPassword: ''
        }
    });

    const { mutate, isPending, isSuccess } = useMutation({
        mutationFn: async (data: SchemaNewPasswordInputDto) => {
            if (!recoveryCode) {
                throw new Error('Recovery code is missing');
            }

            const response = await client.POST('/api/v1/auth/new-password', {
                body: {
                    newPassword: data.newPassword,
                    recoveryCode: recoveryCode,
                }
            });

            if (response.error) {
                throw response.error as unknown;
            }
            return response.data;
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
    });

    const onSubmit = (data: NewPasswordFormData) => {
        if (!recoveryCode) {
            console.error('No recovery code found');
            return;
        }

        mutate({
            newPassword: data.newPassword,
            recoveryCode: recoveryCode
        });
    };

    // Проверяем, готов ли компонент к отправке формы
    const isFormReady = isValid && !!recoveryCode;

    // Проверяем, можно ли отправить форму (учитывая валидность и наличие recoveryCode)
    const canSubmit = !isPending && !isSubmitting && isFormReady;

    // Текст для кнопки
    const buttonText = isPending ? 'Creating...' : 'Create new password';

    return {
        // Состояния
        errors,
        isPending,
        isSubmitting,
        isValid,
        isSuccess,
        recoveryCode,

        // Флаги состояния
        isFormReady,
        canSubmit,

        // Методы react-hook-form
        handleSubmit,
        register,

        // Обработчики
        onSubmit,
        buttonText,
    };
};