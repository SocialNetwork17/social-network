import { useMutation, useQueryClient } from '@tanstack/react-query'
import { client } from '@/shared/api/client'


export const useCreatePostMutation = () => {
    const qc = useQueryClient()

    return useMutation({
        mutationFn: async (payload: { description: string; childrenMetadata: { uploadId: string }[] }) => {
            const res = await client.POST('/api/v1/posts', {
                body: payload,
                credentials: 'include',
            })
            if (res.error) {
                throw new Error(res.error?.messages?.[0]?.message || 'Create post failed')
            }
            return res.data
        },
        onSuccess: (data) => {
            // принудительное обновление данных, которые уже лежат в кэше React Query.
            qc.invalidateQueries({ queryKey: ['posts', 'feed'] })
            qc.invalidateQueries({ queryKey: ['posts', 'my-profile'] })
        },
    })
}
