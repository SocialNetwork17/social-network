import { z } from 'zod'

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(3, { message: 'Email is required' })
    .email({ message: 'The email must match example@example.com' }),
})

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
