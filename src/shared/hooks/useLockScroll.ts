import { useEffect, useRef } from "react"

let lockCount = 0
let scrollY = 0

export const useLockScroll = (isLocked: boolean) => {
    const lockedRef = useRef(false)

    useEffect(() => {
        if (!isLocked || lockedRef.current) return

        lockedRef.current = true
        lockCount++

        if (lockCount === 1) {
            scrollY = window.scrollY

            const scrollbarWidth =
                window.innerWidth - document.documentElement.clientWidth

            document.body.style.position = "fixed"
            document.body.style.top = `-${scrollY}px`
            document.body.style.left = "0"
            document.body.style.right = "0"
            document.body.style.overflow = "hidden"
            document.body.style.paddingRight = `${scrollbarWidth}px`
            document.body.style.width = "100%"
        }

        return () => {
            if (!lockedRef.current) return

            lockedRef.current = false
            lockCount = Math.max(0, lockCount - 1)

            if (lockCount === 0) {
                document.body.style.position = ""
                document.body.style.top = ""
                document.body.style.left = ""
                document.body.style.right = ""
                document.body.style.overflow = ""
                document.body.style.paddingRight = ""
                document.body.style.width = ""

                window.scrollTo(0, scrollY)
            }
        }
    }, [isLocked])
}