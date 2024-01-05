import { FC } from 'react'
import s from './Articles.module.scss'
import AdminImage from '@/public/articles/admin.svg'
import { IArticle } from '@/src/services/articles/articles.interface'
import Moment from 'react-moment'
import { useRouter } from 'next/router'
import { getArticleUrl } from '@/src/config/url.config'
import Link from 'next/link'

const ArticleItem: FC<IArticle> = ({ id, title, shortContent, createdAt, comments }) => {
    return (
        <Link href={getArticleUrl(`/${id}`)}>
            <article className={s.root__article}>
                <div className={s.root__articleInfo}>
                    <div className={s.root__articleAuthor}>
                        <AdminImage />

                        <span>root</span>
                    </div>

                    <span className={s.root__articleInfoSeparator}></span>

                    <div className={s.root__articleCreatedAt}>
                        <Moment fromNow>{createdAt}</Moment>
                    </div>

                    <span className={s.root__articleInfoSeparator}></span>

                    <div className={s.root__articleComments}>
                        {comments.length} comments
                    </div>
                </div>

                <div className={s.root__articleTitle}>
                    {title}
                </div>

                <div className={s.root__articleDescription}>
                    {shortContent}
                </div>
            </article>
        </Link>
    )
}

export default ArticleItem