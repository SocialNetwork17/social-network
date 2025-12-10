import {useMutation} from "@tanstack/react-query"
import {RegistrationType} from "../lib/registrationSchema"
import {client} from "@/shared/api/client";
import {handleError} from "@/shared/utils/handleError";
import {ServerError} from "@/shared/types/types";

export const useRegistration = () => {

    const mutation = useMutation({
        mutationKey: ["registration"],
        mutationFn: async (data: RegistrationType) => {
            const response = await client.POST('/api/v1/auth/registration', {
                body: {
                    userName: data.userName,
                    email: data.email,
                    password: data.password,
                    baseUrl: "http://localhost:3000"
                }
            })
            if(response.error) {
                handleError(response.error)
            }
            return response.data
        },
    })

    return mutation
}