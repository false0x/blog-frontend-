import { ArticleService } from '@/src/services/article/article.service'
import { useQuery } from 'react-query'
import { toastError } from '@/src/utils/toast-error'

interface UseArticlesOptions {
    page?: number;
}


export const useArticles = (options: UseArticlesOptions = {}) => {
    const { page = 1 } = options;

    const { isLoading, data, refetch } = useQuery(
        ['get all article', page],
        () => ArticleService.getAll(page),
        {
            onError: (error) => toastError(error)
        }
    );

    return { isLoading, data: data?.data, refetch };
};