import { FC } from 'react'
import s from './Manage.module.scss'
import AdminImage from '@/public/articles/admin.svg'
import { useArticles } from '@/src/components/screens/Home/Articles/useArticles'
import Moment from 'react-moment';
import { useRouter } from 'next/router'
import { getAdminArticleUrl } from '@/src/config/url.config'
import { useMutation } from 'react-query'
import { IArticleCreate } from '@/src/services/articles/articles.interface'
import { ArticlesService } from '@/src/services/articles/articles.service'
import { toast } from 'react-toastify'
import { errorCatch } from '@/src/api/api.helper'

const Manage: FC = () => {
    const router = useRouter()
    const { data, refetch } = useArticles()

    const { isLoading, mutateAsync } = useMutation(
        'delete article',
        (id: number) => ArticlesService.delete(id),
        {
            onSuccess: async () => {
                toast.success(`Article successfully deleted ✅`)

                await refetch()
            },
            onError(error) {
                toast.error(`Error: ${errorCatch(error)} ❌`)
            },
        },
    )

    const handleDelete = async (id: number) => {
        await mutateAsync(id)
    }

    const handleCreateButton = () => router.push(getAdminArticleUrl('/create'))
    const handleEditButton = (id: number) => router.push(getAdminArticleUrl(`/edit/${id}`))

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
                                <div onClick={() => handleEditButton(article.id)} className={s.root__articleEdit}>
                                    Edit
                                </div>

                                <span className={s.root__articleInfoSeparator}></span>

                                <button onClick={() => handleDelete(article.id)} disabled={isLoading} className={s.root__articleDelete}>
                                    Delete
                                </button>
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