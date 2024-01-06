import { ArticlesService } from '@/src/services/articles/articles.service'
import { useQuery } from 'react-query'

interface UseArticlesOptions {
    page?: number;
}


export const useArticles = (options: UseArticlesOptions = {}) => {
    const { page = 1 } = options;

    const { isLoading, data, refetch } = useQuery(
        ['get all articles', page],
        () => ArticlesService.getAll(page)
    );

    return { isLoading, data: data?.data, refetch };
};