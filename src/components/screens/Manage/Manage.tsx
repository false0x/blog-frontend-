import { FC } from 'react'
import s from './Manage.module.scss'
import { useArticles } from '@/src/components/screens/Home/Articles/useArticles'
import { useRouter } from 'next/router'
import { getAdminArticleUrl } from '@/src/config/url.config'
import ManageArticleItem from '@/src/components/screens/Manage/ManageArticleItem'
import Pagination from '@/src/components/ui/pagination/Pagination'
import { usePagination } from '@/src/hooks/usePagination'

const Manage: FC = () => {
    const router = useRouter()
    const { refetch, data, currPage, setCurrPage, totalPages } = usePagination()

    const handleCreateButton = () => router.push(getAdminArticleUrl('/create'))

    return (
        <div className={s.root}>
            <div className={s.root__actions}>
                <button onClick={handleCreateButton}>Create article</button>
            </div>

            <div className={s.root__articles}>
                {
                    data?.articles.map(article => (
                        <ManageArticleItem key={article.id} {...article} />
                    ))
                }

                {
                    !data?.articles?.length && <div className={s.root}>There are no articles yet.</div>
                }
            </div>

            <Pagination
                totalPages={totalPages}
                setCurrPage={setCurrPage}
                currPage={currPage}
                refetch={refetch}
                data={data}
            />
        </div>
    )
}

export default Manage