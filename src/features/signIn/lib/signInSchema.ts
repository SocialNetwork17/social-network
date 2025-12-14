import { z } from "zod";

export const signInSchema = z.object({
    email: z
        .string()
        .min(3, "Email is required")
        .email("The email must match the format example@example.com"),

    password: z
        .string()
        .min(3, "Password is required"),
});

export type SignInFormValues = z.infer<typeof signInSchema>;
