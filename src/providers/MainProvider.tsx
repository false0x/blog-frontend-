import { FC, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import AuthProvider from './AuthProvider/AuthProvider'
import Toastify from './Toastify'
import { TypeComponentAuthFields } from '@/src/shared/auth.types'
import { store } from '@/src/store/store'
import Layout from '@/src/components/layout/Layout'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
})

const MainProvider: FC<TypeComponentAuthFields> = ({ children, Component }) => {
    useEffect(() => {
        console.log(`
 _   _ _____ _____ ____    _        _    ____  
| | | |_   _|_   _|  _ \\  | |      / \\  | __ ) 
| |_| | | |   | | | |_) | | |     / _ \\ |  _ \\ 
|  _  | | |   | | |  __/  | |___ / ___ \\| |_) |
|_| |_| |_|   |_| |_|     |_____/_/   \\_\\____/ 
    `)
    }, [])

    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <Toastify />
                <AuthProvider Component={Component}>
                    <Layout>{children}</Layout>
                </AuthProvider>
            </QueryClientProvider>
        </Provider>
    )
}

export default MainProvider
