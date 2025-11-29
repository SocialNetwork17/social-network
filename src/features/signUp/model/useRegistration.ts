import {useMutation, UseMutationOptions} from "@tanstack/react-query"
import { RegistrationType } from "../lib/registrationSchema"
import {client} from "@/shared/api/client";

export const useRegistration = () => {
    return useMutation({
        mutationKey: ["registration"],
        mutationFn: async (data: RegistrationType) => {
            const response =   await client.POST('/api/v1/auth/registration', {
                body: {
                    userName: data.userName,
                    email: data.email,
                    password: data.password,
                    baseUrl: "http://localhost:3000"
                }
            })

            if(response.error) {
                throw new Error(response.error.messages?.[0]?.message)
            }
            return response.data
        },
        retry: false,
    })
}