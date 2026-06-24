import { RefObject, useEffect } from 'react'

export const useClickOutside = (
    ref: RefObject<HTMLElement | null>,
    callback: () => void
) => {
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                callback()
            }
        }
        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [ref, callback])
}