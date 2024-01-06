import { FC } from 'react'
import s from './Manage.module.scss'
import AdminImage from '@/public/articles/admin.svg'
import Moment from 'react-moment'
import { IArticle } from '@/src/services/articles/articles.interface'
import { getAdminArticleUrl } from '@/src/config/url.config'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { ArticlesService } from '@/src/services/articles/articles.service'
import { toast } from 'react-toastify'
import { errorCatch } from '@/src/api/api.helper'
import { useArticles } from '@/src/components/screens/Home/Articles/useArticles'

const ManageArticleItem: FC<IArticle> = (article) => {
    const router = useRouter()

    const { refetch } = useArticles()

    const handleEditButton = (id: number) => router.push(getAdminArticleUrl(`/edit/${id}`))

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

    return (
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
    )
}

export default ManageArticleItem