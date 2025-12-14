// lib/schemas/auth.ts
import { z } from 'zod';

export const passwordRecoverySchema = z.object({
    email: z
        .string()
        .min(1, { message: 'Email is required' })
        .email({ message: 'Invalid email address' }) // Добавляем email валидацию
        .regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, {
            message: 'Invalid email format'
        })
        .transform((email) => email.toLowerCase().trim()),

    recaptcha: z
        .string()
        .min(1, { message: 'Please complete reCAPTCHA verification' }),

    baseUrl: z
        .string()
        .optional()
        .default("http://localhost:3000/createNewPassword") // Добавляем дефолтное значение
});

export type PasswordRecoveryFormData = z.infer<typeof passwordRecoverySchema>;