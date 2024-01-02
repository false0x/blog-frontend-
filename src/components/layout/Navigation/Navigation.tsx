import { FC } from 'react'
import s from './Navigation.module.scss'
import LogoImage from '@/public/navigation/logo.svg'
import { NavigationData } from '@/src/components/layout/Navigation/navigation.data'
import NavigationItem from '@/src/components/layout/Navigation/NavigationItem'

const Navigation: FC = () => {
    return (
        <div className={s.root}>
            <LogoImage />

            <div className={s.root__items}>
                {
                    NavigationData.map((item) => (
                        <NavigationItem {...item} key={item.path} />
                    ))
                }
            </div>
        </div>
    )
}

export default Navigation