import { axiosAuth, axiosClassic } from '@/src/api/api.interceptor'
import { getArticleUrl } from '@/src/config/api.config'
import { IArticle, IArticleCreate } from '@/src/services/articles/articles.interface'

export const ArticlesService = {
    async getAll() {
        return axiosClassic.get<IArticle[]>(getArticleUrl())
    },

    async create(data: IArticleCreate) {
        return axiosAuth.post<IArticle>(getArticleUrl(), data)
    }
}