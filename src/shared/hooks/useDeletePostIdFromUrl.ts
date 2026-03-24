"use client"
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import {PATH} from "@/shared/constants/routings";

export const useDeletePostIdFromUrl = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const deletePostIdFromUrl = () => {
        if (!searchParams?.has('postId')) return

        const params = new URLSearchParams(searchParams.toString())
        params.delete('postId')

        const newUrl = params.toString()
            ? `${pathname}?${params.toString()}`
            : pathname

        router.replace(newUrl ?? PATH.MAIN, { scroll: false })
    }
    return { deletePostIdFromUrl }
}