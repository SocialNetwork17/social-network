import { useMutation } from "@tanstack/react-query";
import { client } from "@/shared/api/client";
import {PATH} from "@/shared/constants/routings";

type LoginArgs = {
    email: string;
    password: string;
};

type LoginResponse = {
    accessToken: string;
};

export const useLoginMutation = () => {
    return useMutation({
        mutationFn: async (data: LoginArgs) => {
            const res = await client.POST("/api/v1/auth/login", {
                body: data,
            });

            if (res.error) {
                throw new Error(res.error.messages?.[0]?.message || "Login failed");
            }

            return res.data as LoginResponse;
        },

        onSuccess: (data) => {
            // ✅ сохраняем токен
            localStorage.setItem("accessToken", data.accessToken);
            window.location.href = PATH.PROFILE;
        },
    });
};

