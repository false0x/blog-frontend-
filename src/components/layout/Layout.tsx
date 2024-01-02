import {FC, PropsWithChildren} from 'react'
import s from './Layout.module.scss'
import Navigation from "@/src/components/layout/Navigation/Navigation";

const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className={s.root}>
            <Navigation />

            <div className={s.root__content}>
                {children}
            </div>
        </div>
    )
}

export default Layout