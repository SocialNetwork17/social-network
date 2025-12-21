'use client'

import styles from './CreateNewPasswordForm.module.scss'
import {Input} from "@/shared/ui/Input/Input";
import {Button} from "@/shared/ui/Button/Button";
import { useCreateNewPassword } from '../model/useCreateNewPassword';
import {useForm} from "react-hook-form";
import {NewPasswordFormData, newPasswordSchema} from "@/features/createNewPassword/lib/createNewPasswordSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {PATH} from "@/shared/constants/routings";
import {useSearchParams, useRouter} from "next/navigation";

// Типизация ошибок API
type ApiError = {
    statusCode?: number;
    messages?: Array<{
        message?: string;
        field?: string;
    }>;
    error?: string;
}

export const CreateNewPasswordForm = () => {
    // Хуки Next.js для работы с роутингом и параметрами URL
    const router = useRouter();
    const searchParams = useSearchParams();

    // Инициализация формы с react-hook-form и валидацией через Zod
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting, isValid },
        reset,
    } = useForm<NewPasswordFormData>({
        resolver: zodResolver(newPasswordSchema), // Интеграция Zod для валидации
        mode: 'onChange', // Валидация при каждом изменении
        defaultValues: {
            newPassword: '',
            confirmPassword: ''
        }
    });

    // Получение recovery code из query параметров URL
    const recoveryCode = searchParams ? searchParams.get('code') : null;

    // Кастомный хук для мутации создания нового пароля (React Query)
    const {
        mutate: createNewPassword,
        isPending,
    } = useCreateNewPassword();

    // Основная функция обработки отправки формы
    const onSubmit = (data: NewPasswordFormData) => {
        // Защита: проверка наличия recovery code перед отправкой
        if (!recoveryCode) {
            console.error('No recovery code found');
            return;
        }

        // Вызов мутации для создания нового пароля
        createNewPassword({
            newPassword: data.newPassword,
            recoveryCode: recoveryCode
        }, {
            // Обработка успешного ответа
            onSuccess: () => {
                reset(); // Сброс формы к дефолтным значениям

                // Перенаправление на страницу входа через 3 секунды
                setTimeout(() => {
                    router.push(PATH.SIGN_IN);
                }, 3000);
            },
            // Обработка ошибок
            onError: (error: unknown) => {
                console.error('Recovery error:', error);

                // Проверка и обработка структурированных ошибок API
                if (error && typeof error === 'object') {
                    const apiError = error as ApiError;

                    console.log('API Error details:', apiError);

                    // Обработка ошибки невалидного кода восстановления
                    if (apiError.statusCode === 400 && apiError.messages) {
                        apiError.messages.forEach((errMsg) => {
                            if (errMsg.message === 'Password recovery code is invalid') {
                                // Перенаправление на страницу просроченной ссылки
                                router.push(PATH.LINK_EXPIRED);
                                return;
                            }
                        });
                    }
                }
            }
        });
    };

    // проверка возможности отправки формы
    const canSubmit = !isPending && !isSubmitting && isValid && !!recoveryCode;

    return (
        <div className={styles.CreateNewPasswordPage}>
            <h2 className={styles.title}>Create New Password</h2>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputsWrapper}>
                    {/* Поле для нового пароля с валидацией */}
                    <Input
                        {...register('newPassword')} // Регистрация поля в react-hook-form
                        errorText={errors.newPassword?.message}
                        error={!!errors.newPassword}
                        label={'New password'}
                        type={'password'}
                        placeholder={'******************'}
                        required={false}
                        disabled={isPending || isSubmitting} // Блокировка во время отправки
                    />
                    {/* Поле подтверждения пароля */}
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

                {/* Кнопка отправки формы с контролем состояния */}
                <Button
                    variant={'primary'}
                    type="submit"
                    disabled={!errors}
                >
                    {isPending ? 'Creating...' : 'Create new password'}
                </Button>
            </form>
        </div>
    )
}