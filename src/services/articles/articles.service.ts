import { axiosAuth, axiosClassic } from '@/src/api/api.interceptor'
import { getArticleUrl } from '@/src/config/api.config'
import { IArticle, IArticleCreate } from '@/src/services/articles/articles.interface'

export const ArticlesService = {
    async get(id: number) {
        return axiosClassic.get<IArticle>(getArticleUrl(`/${id}`))
    },

    async getAll() {
        return axiosClassic.get<IArticle[]>(getArticleUrl())
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