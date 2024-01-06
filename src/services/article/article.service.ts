import { axiosAuth, axiosClassic } from '@/src/api/api.interceptor'
import { getArticleUrl } from '@/src/config/api.config'
import { IArticle, IArticleCreate, IArticleResponse } from '@/src/services/article/article.interface'

export const ArticleService = {
    async get(id: number) {
        return axiosClassic.get<IArticle>(getArticleUrl(`/${id}`))
    },

    async getAll(page?: number) {
        const params = page ? { page } : {};

        return axiosClassic.get<IArticleResponse>(getArticleUrl(), { params });
    },

    async create(data: IArticleCreate) {
        return axiosAuth.post<IArticle>(getArticleUrl(), data)
    },

    async delete(id: number) {
        return axiosAuth.delete<IArticle>(getArticleUrl(`/${id}`))
    },

    async update(data: IArticleCreate, id: number) {
        return axiosAuth.put<IArticle>(getArticleUrl(`/${id}`), data)
    }
}