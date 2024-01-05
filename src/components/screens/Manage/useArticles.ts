import { useQuery } from 'react-query'
import { ArticlesService } from '@/src/services/articles/articles.service'

export const useArticles = () => {
    const { isLoading, data, refetch } = useQuery(
        'get all articles',
        () => ArticlesService.getAll()
    )

    return { isLoading, data: data?.data, refetch }
}