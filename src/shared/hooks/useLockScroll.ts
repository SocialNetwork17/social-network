import {useEffect} from "react";

export const useLockScroll = (isLock: boolean) => {
    useEffect(() => {
        if (!isLock) return

        const scrollY = window.scrollY
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

        document.body.style.position = 'fixed'
        document.body.style.top = `-${scrollY}px`
        document.body.style.left = '0'
        document.body.style.right = '0'
        document.body.style.overflow = 'hidden'
        document.body.style.paddingRight = `${scrollbarWidth}px`

        return () => {

            document.body.style.position = ''
            document.body.style.top = ''
            document.body.style.left = ''
            document.body.style.right = ''
            document.body.style.overflow = ''
            document.body.style.paddingRight = ''

            window.scrollTo(0, scrollY)
        }

    }, [isLock])
}