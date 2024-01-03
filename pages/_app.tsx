import type { AppProps } from 'next/app'
import '@/styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css';
import MainProvider from '@/src/providers/MainProvider'
import { TypeComponentAuthFields } from '@/src/shared/auth.types'

type TypeAppProps = AppProps & TypeComponentAuthFields

export default function App({ Component, pageProps }: TypeAppProps) {
    return (
        <MainProvider Component={Component}>
            <Component {...pageProps} />
        </MainProvider>
    );
}
