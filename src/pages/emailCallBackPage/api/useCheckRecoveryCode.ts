import {useMutation} from "@tanstack/react-query";
import {client} from "@/shared/api/client";
import {handleError} from "@/shared/utils/handleError";

export const useCheckRecoveryCode = ()=> {
    const mutation = useMutation({
        mutationKey: ['check-recoveryCode'],
        mutationFn: async (code: string) => {
            const response = await client.POST('/api/v1/auth/check-recovery-code', {
                body: {
                    recoveryCode: code
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