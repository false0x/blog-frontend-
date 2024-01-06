import { ArticleService } from '@/src/services/article/article.service'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { getAdminUrl } from '@/src/config/url.config'
import { toastError } from '@/src/utils/toast-error'

export const useArticles = () => {
    const { push, query } = useRouter()

    const articleId = Number(query.id)

    const { data, refetch } = useQuery(
        'get article',
        () => ArticleService.get(articleId),
        {
            select: (data) => data.data,
            enabled: !!articleId,
            onError: (error) => {
                push('/')

                toastError(error)
            },
        },
    )

    return { data, refetch, articleId }
}