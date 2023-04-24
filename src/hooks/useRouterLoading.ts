import { useState, useEffect } from "react";
import { useRouter } from "next/router"

function useRouterLoading() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        const handleRouteChangeComplete = () => {
            setIsLoading(false)
        }
        const handleRouteChangeStart = () => {
            setIsLoading(true)
        }
        router.events.on("routeChangeStart", handleRouteChangeStart)
        router.events.on('routeChangeComplete', handleRouteChangeComplete)
        return () => {
            router.events.off("routeChangeStart", handleRouteChangeStart)
            router.events.off('routeChangeComplete', handleRouteChangeComplete)
        }
    }, [router])
    return { isLoading }
}

export default useRouterLoading