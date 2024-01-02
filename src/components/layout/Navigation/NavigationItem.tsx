import { FC } from 'react'
import s from './Navigation.module.scss'
import cn from 'classnames'
import Link from 'next/link'
import { NavigationItemType } from '@/src/components/layout/Navigation/navigation.data'
import { useRouter } from 'next/router'

const NavigationItem: FC<NavigationItemType> = ({ path, Image }) => {
    const router = useRouter()
    const isActive = router.pathname === path

    return (
        <Link href={path} key={path} className={cn({
            [s.active]: isActive,
        })}>
            <div className={cn(s.root__item)}>
                <Image />
            </div>
        </Link>
    )
}

export default NavigationItem