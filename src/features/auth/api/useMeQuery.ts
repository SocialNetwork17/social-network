import {useQuery} from "@tanstack/react-query";
import {client} from "@/shared/api/client";

export type MeResponse = {
    userId: number;
    userName: string;
    email: string;
    isBlocked: boolean;
};


export const useMeQuery = () => {
    return useQuery({
        queryKey: ["auth", "me"],
        queryFn: async () => {
            const response = await client.GET("/api/v1/auth/me", {
                credentials: "include",
            });

            if (response.error) {
                return null;
            }

            return response.data; // TypeScript выведет тип автоматически
        },
        retry: false,
        refetchOnWindowFocus: false,
    });
}