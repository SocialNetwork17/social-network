import {useMutation} from "@tanstack/react-query";
import {client} from "@/shared/api/client";

export const useRegistrationConfirmation = ()=> {
    const mitation = useMutation({
        mutationKey: ['registration-confirmation'],
        mutationFn: async (code: string) => {
            const response = await client.POST('/api/v1/auth/registration-confirmation', {
                body: {
                    confirmationCode: code
                },
            })
            return response.data
        }
    })
    return mitation
}