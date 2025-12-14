import {useMeQuery} from "@/features/auth/api/useMeQuery";

export const useAuth = () => {
    const { data, isLoading, isError } = useMeQuery()

    const isAuth = Boolean(data)

    return {
        isAuth,
        isLoading,
        isError,
        user: data
    }
}