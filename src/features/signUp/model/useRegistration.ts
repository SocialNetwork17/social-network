import {useMutation} from "@tanstack/react-query"
import {RegistrationType} from "../lib/registrationSchema"
import {client} from "@/shared/api/client";

export const useRegistration = () => {

    const mutation = useMutation({
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
            return response.data
        },
    })

    return mutation
}