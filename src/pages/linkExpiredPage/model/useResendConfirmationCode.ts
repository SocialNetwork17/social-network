import {useMutation} from "@tanstack/react-query";
import {client} from "@/shared/api/client";

export const useResendConfirmationCode = () => {
    const mutation = useMutation({
        mutationKey: ['auth', 'resendConfirmationCode', ],
        mutationFn: async (email: string) => {
            const response = await client.POST("/api/v1/auth/registration-email-resending", {
                body: {
                    email: email,
                    baseUrl:"http://localhost:3000"
                }
            })
            if(response.error) {
                throw new Error(response.error.messages?.[0]?.message)
            }
        }
    });

    return mutation
}