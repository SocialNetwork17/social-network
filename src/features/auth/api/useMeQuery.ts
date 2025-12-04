import {useQuery} from "@tanstack/react-query";
import {client} from "@/shared/api/client";

export type MeResponse = {
    userId: number;
    userName: string;
    email: string;
    isBlocked: boolean;
};



export const useMeQuery = () => {

    return useQuery<MeResponse | null>({
        queryKey: ["auth", "me"],
        credentials: "include",
        queryFn: async () => {
            const response = await client.GET("/api/v1/auth/me", {
                credentials: "include", // чтобы cookie всегда отправлялась
            });

                if (response.error) {
                    return null; // ❗ пользователь не авторизован
                }

            return response.data;
        },
        retry: false,
        refetchOnWindowFocus: false,
    });
};

