// src/features/signIn/model/useMeQuery.ts
import { useQuery } from "@tanstack/react-query";
import { client } from "@/shared/api/client";

export type MeResponse = {
    userId: number;
    userName: string;
    email: string;
    isBlocked: boolean;
};

export const useMeQuery = () => {
    return useQuery<MeResponse, Error>({
        queryKey: ["auth", "me"],
        queryFn: async () => {
            const token = localStorage.getItem("accessToken");

            // Отправляем запрос на сервер, даже если токена нет
            const response = await client.GET("/api/v1/auth/me", {
                headers: token ? { Authorization: `Bearer ${token}` } : undefined,
            });

            if (response.error || !response.data) {
                const err = response.error as { messages?: { message: string }[] } | undefined;
                throw new Error(err?.messages?.[0]?.message || "Unauthorized");
            }

            return response.data; // гарантировано MeResponse
        },
        retry: true,            // не повторять автоматически при 401
        refetchInterval: 10 * 1000, // опционально, частота рефетча
    });
};
