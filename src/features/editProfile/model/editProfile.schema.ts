import {z} from 'zod'
import {usernameRegex} from "@/features/signUp/lib/registrationSchema";


const nameRegex = /^[A-Za-zА-Яа-яЁё]+$/;

export const editProfileSchema = z.object({
    userName: z
        .string()
        .min(6, 'Minimum number of characters is 6')
        .max(30, 'Maximum number of characters is 30')
        .regex(
            usernameRegex,
            'Username can only contain letters, numbers, "_" and "-"'
        ),

    firstName: z
        .string()
        .min(1, 'First name is required')
        .max(50, 'Maximum number of characters is 50')
        .regex(
            nameRegex,
            'First name can only contain Latin and Cyrillic letters'
        ),

    lastName: z
        .string()
        .min(1, 'Last name is required')
        .max(50, 'Maximum number of characters is 50')
        .regex(
            nameRegex,
            'Last name can only contain Latin and Cyrillic letters'
        ),

    dateOfBirth: z
        .date()
        .refine(date => {
            const today = new Date()
            const minDate = new Date(
                today.getFullYear() - 13,
                today.getMonth(),
                today.getDate()
            )

            return date <= minDate
        }, {
            message: 'A user under 13 cannot create a profile.',
        }),

    aboutMe: z
        .string()
        .max(200, 'Maximum number of characters is 200')
        .optional(),

    countryId: z.string().optional(),
    cityId: z.string().optional(),

});

export type EditProfileType = z.infer<typeof editProfileSchema>