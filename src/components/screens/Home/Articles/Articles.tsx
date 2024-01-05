import { FC } from 'react'
import s from './Articles.module.scss'
import { useArticles } from '@/src/components/screens/Home/Articles/useArticles'
import ArticleItem from '@/src/components/screens/Home/Articles/ArticleItem'

const Articles: FC = () => {
    const { data } = useArticles()

    return (
        <div className={s.root}>
            <div className={s.root__articles}>
                {
                    data?.map(article => (
                        <ArticleItem key={article.id} {...article} />
                    ))
                }

                {
                    !data?.length && (
                        <div className={s.root__articlesEmpty}>No articles yet.</div>
                    )
                }
            </div>
        </div>
    )
}

export default Articles