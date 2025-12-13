'use client'

import { useState } from "react";
import { useMutation } from '@tanstack/react-query';
import { useForm } from "react-hook-form";
import { client } from "@/shared/api/client";
import { SchemaPasswordRecoveryInputDto, SchemaRecaptchaErrorResponseDto } from "@/shared/api/schema";

export const useForgotPassword = () => {
    const [linkSent, setLinkSent] = useState(false);
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userEmail, setUserEmail] = useState<string>('');

    const {
        handleSubmit,
        register,
        formState: { errors },
        setError,
        clearErrors,
    } = useForm<SchemaPasswordRecoveryInputDto>({
        mode: 'onChange',
        defaultValues: {
            email: ''
        }
    });

    // Кнопка ДИЗАБЛИТСЯ ТОЛЬКО если email не заполнен ИЛИ reCAPTCHA не установлена
    const isButtonDisabled = !userEmail || !recaptchaToken;

    const { mutate, reset: resetMutation, isPending } = useMutation({
        mutationFn: async (data: SchemaPasswordRecoveryInputDto) => {
            if (!recaptchaToken) {
                throw new Error('reCAPTCHA verification required');
            }

            const response = await client.POST('/api/v1/auth/password-recovery', {
                body: {
                    email: data.email,
                    baseUrl: "http://localhost:3000/createNewPassword",
                    recaptcha: recaptchaToken
                }
            });

            if (response.error) {
                throw response.error;
            }
            return response.data;
        },
        onSuccess: () => {
            setIsModalOpen(true);
            setLinkSent(true);
            setRecaptchaToken(null);
        },
        onError: (error: SchemaRecaptchaErrorResponseDto | Error | string) => {
            console.error('Recovery error:', error);

            if (typeof error === 'object' && 'statusCode' in error) {
                const apiError = error as SchemaRecaptchaErrorResponseDto;

                if (apiError.statusCode === 400 && apiError.messages) {
                    apiError.messages.forEach((errMsg) => {
                        if (errMsg.field === 'email') {
                            setError('email', {
                                type: 'manual',
                                message: 'User with this email doesn\'t exist'
                            });
                        }
                    });
                }
            }
            setRecaptchaToken(null);
        },
    });

    const handleRecaptchaVerify = (token: string) => {
        setRecaptchaToken(token);
        clearErrors('recaptcha');
    };

    const handleRecaptchaError = () => {
        setRecaptchaToken(null);
    };

    const onSubmit = (data: SchemaPasswordRecoveryInputDto) => {
        clearErrors();

        if (!recaptchaToken) {
            return;
        }
        mutate(data);
    };

    const handleSendAgain = () => {
        setLinkSent(false);
        setRecaptchaToken(null);
        resetMutation();
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleEmailChange = (email: string) => {
        setUserEmail(email);
    };

    return {
        // Состояния
        linkSent,
        recaptchaToken,
        isModalOpen,
        userEmail,
        errors,
        isPending,
        isButtonDisabled,

        // Методы react-hook-form
        handleSubmit,
        register,
        clearErrors,

        // Обработчики
        handleRecaptchaVerify,
        handleRecaptchaError,
        onSubmit,
        handleSendAgain,
        handleModalClose,
        handleEmailChange,
    };
};