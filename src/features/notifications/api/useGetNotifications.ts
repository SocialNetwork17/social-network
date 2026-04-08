import {useQuery} from "@tanstack/react-query";
import {client} from "@/shared/api/client";

export const useGetNotifications = () => {
    return useQuery({
        queryKey: ['notifications'],
        queryFn: async () => {
            const response = await client.GET("/api/v1/notifications/{cursor}", {
                params: {
                    path: {
                        cursor: 12
                    }
                }
            })

            if(response.error) {
                throw response.error
            }

            return response.data
        }
    })
}