import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import {FC, useEffect} from "react";
import { TypeComponentAuthFields } from '@/src/shared/auth.types'
import { useActions } from '@/src/hooks/useActions'
import { useAuth } from '@/src/hooks/useAuth'

const DynamicCheckRole = dynamic(() => import("./CheckRole"), {
  ssr: false
});

const AuthProvider: FC<TypeComponentAuthFields> = ({
  children,
  Component: { isOnlyAdmin }
}) => {
  const { isLoggedIn } = useAuth()
  const { logout, checkAuth } = useActions()

  const { pathname } = useRouter()

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");

    if (accessToken) checkAuth()
  }, [])

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");

    if (!accessToken && isLoggedIn) logout(false)
  }, [pathname])

  if (!isOnlyAdmin) return <>{children}</>

  return <DynamicCheckRole Component={{ isOnlyAdmin }}>{children}</DynamicCheckRole>
}

export default AuthProvider;
