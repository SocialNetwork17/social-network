import { useMutation, useQueryClient } from '@tanstack/react-query'
import { client } from '@/shared/api/client'

export const useDeleteAvatarMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async () => {
            await client.DELETE('/api/v1/users/profile/avatar')
        },

        onSuccess: () => {
            // после удаления — обновляем профиль
            queryClient.invalidateQueries({
                queryKey: ['profile'],
            })
        },
    })
}
