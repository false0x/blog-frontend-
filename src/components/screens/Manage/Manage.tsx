import { FC } from 'react'
import s from './Manage.module.scss'
import AdminImage from '@/public/articles/admin.svg'
import { useArticles } from '@/src/components/screens/Manage/useArticles'
import Moment from 'react-moment';
import { useRouter } from 'next/router'
import { getAdminArticleUrl } from '@/src/config/url.config'

const Manage: FC = () => {
    const router = useRouter()
    const { data } = useArticles()

    const handleCreateButton = () => router.push(getAdminArticleUrl('/create'))

    return (
        <div className={s.root}>
            <div className={s.root__actions}>
                <button onClick={handleCreateButton}>Create article</button>
            </div>

            <div className={s.root__articles}>
                {
                    data?.map(article => (
                        <article key={article.id} className={s.root__article}>
                            <div className={s.root__articleInfo}>
                                <div className={s.root__articleAuthor}>
                                    <AdminImage />

                                    <span>root</span>
                                </div>

                                <span className={s.root__articleInfoSeparator}></span>

                                <div className={s.root__articleCreatedAt}>
                                    <Moment fromNow>{article.createdAt}</Moment>
                                </div>
                            </div>

                            <div className={s.root__articleTitle}>
                                {article.title}
                            </div>

                            <div className={s.root__articleDescription}>
                                {article.shortContent}
                            </div>

                            <div className={s.root__articleInfo}>
                                <div className={s.root__articleEdit}>
                                    Edit
                                </div>

                                <span className={s.root__articleInfoSeparator}></span>

                                <div className={s.root__articleDelete}>
                                    Delete
                                </div>
                            </div>
                        </article>
                    ))
                }

                {
                    !data?.length && <>There are no articles yet.</>
                }
            </div>
        </div>
    )
}

export default Manage