import {useMutation} from "@tanstack/react-query";
import {client} from "@/shared/api/client";
import {UploadImageResponseItem} from "@/entites/posts/createPost/api/types";


export const useUploadImagesMutation = () => {
    return useMutation<UploadImageResponseItem[], Error, File[]>({
        mutationFn: async (files: File[]) => {

            // 1. "Прогревочный" запрос.
            // Зачем? загрузка файлов — тяжёлый запрос, если токен протухнет во время загрузки:
            // запрос упадёт, файл придётся отправлять заново
            // гарантируем свежий токен ДО загрузки
            await client.GET("/api/v1/auth/me").catch(() => null);

            const formData = new FormData();
            files.forEach((f) => formData.append('file', f));

            // 2. Теперь отправляем картинки с уже гарантированно свежим токеном
            const {data, error} = await client.POST('/api/v1/posts/image', {
                body: formData as any,
                bodySerializer: (body) => body,
            });

            if (error || !data) {
                throw new Error(error?.messages?.[0]?.message || 'Upload failed');
            }

            return data.images as UploadImageResponseItem[];
        },
    });
};
