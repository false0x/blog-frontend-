import { useRouter } from "next/router";
import {FC} from "react";
import { TypeComponentAuthFields } from '@/src/shared/auth.types'
import { useAuth } from '@/src/hooks/useAuth'

const CheckRole: FC<TypeComponentAuthFields> = ({
  Component: { isOnlyAdmin }, children
}) => {
  const router = useRouter()
  const { isLoggedIn } = useAuth()

  if (isLoggedIn) return <>{children}</>

  if (isOnlyAdmin) {
    router.pathname !== '/manage/auth' && router.push('/manage/auth')

    return null
  }

  if (!isLoggedIn) return <>{children}</>
}

export default CheckRole