import { useRouter } from "next/router"
import { useEffect } from "react"
import { useAuth } from '@/src/hooks/useAuth'

export const useAuthRedirect = () => {
    const { isLoggedIn } = useAuth()

    const { push } = useRouter()

    useEffect(() => {
        if (isLoggedIn) push('/manage')
    }, [isLoggedIn, push])
}