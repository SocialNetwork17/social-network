'use client'

import { useMutation } from '@tanstack/react-query';
import { client } from "@/shared/api/client";
import {ForgotPasswordInput} from "@/features/forgotPassword/lib/forgotPasswordSchema";

export const useForgotPassword = () => {

    const { mutate, reset: resetMutation, isPending } = useMutation({
        mutationFn: async (body: { data: ForgotPasswordInput, recaptchaToken: string}) => {
            if (!body.recaptchaToken) {
                throw new Error('reCAPTCHA verification required');
            }

            const response = await client.POST('/api/v1/auth/password-recovery', {
                body: {
                    email: body.data.email,
                    baseUrl: "http://localhost:3000/create-new-password",
                    recaptcha: body.recaptchaToken
                }
            });

            if (response.error) {
                throw response.error;
            }
            return response.data;
        }
    });

    return {
        mutate,
        resetMutation,
        isPending
    };
}