import { useMutation, useQueryClient } from '@tanstack/react-query'
import { client } from '@/shared/api/client' // openapi-fetch client for JSON call


export const useUploadImagesMutation = () => {
    return useMutation({
        mutationFn: async (files: File[]) => {
            // 1. "Прогревочный" запрос.
            // Просто дергаем любой легкий эндпоинт через наш client.
            // Если токен протух, middleware обновит его СЕЙЧАС.
            await client.GET("/api/v1/auth/me").catch(() => null);

            const formData = new FormData();
            files.forEach((f) => formData.append('file', f));

            // 2. Теперь отправляем картинки с уже гарантированно свежим токеном
            const { data, error } = await client.POST('/api/v1/posts/image', {
                body: formData as any,
                bodySerializer: (body) => body,
            });

            if (error || !data) {
                throw new Error(error?.messages?.[0]?.message || 'Upload failed');
            }

            return data.images;
        },
    });
};
/**
 * Create post: send JSON with description + childrenMetadata (uploadIds)
 * Using openapi-fetch client.POST which is typed.
 */
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
            // Invalidate feed/profile queries so UI refreshes with new post
            qc.invalidateQueries({ queryKey: ['posts', 'feed'] })
            qc.invalidateQueries({ queryKey: ['posts', 'my-profile'] })
        },
    })
}
