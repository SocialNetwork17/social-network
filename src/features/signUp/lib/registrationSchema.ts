import { z } from "zod";

const usernameRegex = /^[0-9A-Za-z_-]+$/;

const passwordRegex = /^(?=.*[!"#$%&'()*+,\-./:;<=>?@[\\\]^_{|}~])[0-9A-Za-z!"#$%&'()*+,\-./:;<=>?@[\\\]^_{|}~]{6,20}$/;

export const registrationSchema = z.object({
    userName: z
        .string()
        .min(6, "Minimum number of characters 6")
        .max(30, "Maximum number of characters 30")
        .regex(usernameRegex, "Username can only contain letters, numbers, _ and -"),
    email: z
        .string()
        .email("The email must match: example@example.com"),
    password: z
        .string()
        .min(6, "Minimum number of characters 6")
        .max(20, "Maximum number of characters 20")
        .regex(passwordRegex, "Password must contain: a-z, 0-9 A-Z,! \"#$%&'()*+, -./:;<=>?@[\\]^_`{|}~"),
    passwordConfirmation: z.string(),
})
    .refine((data) => data.password === data.passwordConfirmation, {
        path: ["passwordConfirmation"],
        message: "The passwords must match",
    });

export type RegistrationType = z.infer<typeof registrationSchema>