import { FC } from 'react'
import s from './Home.module.scss'
import Articles from '@/src/components/screens/Home/Articles/Articles'

const Home: FC = () => {
    return (
        <div className={s.root}>
            <Articles />
        </div>
    )
}

export default Home