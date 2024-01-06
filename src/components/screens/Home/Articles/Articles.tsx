import { FC, useEffect, useState } from 'react'
import s from './Articles.module.scss'
import { useArticles } from '@/src/components/screens/Home/Articles/useArticles'
import ArticleItem from '@/src/components/screens/Home/Articles/ArticleItem'
import Pagination from '@/src/components/ui/pagination/Pagination'
import { usePagination } from '@/src/hooks/usePagination'

const Articles: FC = () => {
    const { refetch, data, currPage, setCurrPage, totalPages } = usePagination()

    return (
        <div className={s.root}>
            <div className={s.root__articles}>
                {
                    data?.articles.map(article => (
                        <ArticleItem key={article.id} {...article} />
                    ))
                }

                {
                    !data?.articles.length && (
                        <div className={s.root__articlesEmpty}>No articles yet.</div>
                    )
                }

                <Pagination
                    totalPages={totalPages}
                    setCurrPage={setCurrPage}
                    currPage={currPage}
                    refetch={refetch}
                    data={data}
                />
            </div>
        </div>
    )
}

export default Articles