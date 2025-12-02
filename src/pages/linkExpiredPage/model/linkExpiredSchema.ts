import z from "zod"

export const resendEmailSchema = z.object({
    email: registrationSchema.shape.email
})

export type ResendEmailType = z.infer<typeof resendEmailSchema>