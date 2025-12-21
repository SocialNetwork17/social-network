import {useMutation} from "@tanstack/react-query";
import {client} from "@/shared/api/client";
import {handleError} from "@/shared/utils/handleError";

export const useRegistrationConfirmation = ()=> {
    const mutation = useMutation({
        mutationKey: ['registration-confirmation'],
        mutationFn: async (code: string) => {
            const response = await client.POST('/api/v1/auth/registration-confirmation', {
                body: {
                    confirmationCode: code
                },
            })
            if(response.error) {
                handleError(response.error)
            }
            return response.data
        }
    })
    return mutation
}