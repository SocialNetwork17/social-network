import z from 'zod'
import { registrationSchema } from '@/features/signUp/lib/registrationSchema'

export const resendEmailSchema = z.object({
  email: registrationSchema.shape.email,
})

export type ResendEmailType = z.infer<typeof resendEmailSchema>
