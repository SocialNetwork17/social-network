import { z } from 'zod';

// Схема валидации для создания нового пароля
export const newPasswordSchema = z.object({
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

export type NewPasswordFormData = z.infer<typeof newPasswordSchema>;