import { axiosClassic } from '@/src/api/api.interceptor'
import { getCommentUrl } from '@/src/config/api.config'
import { IComment } from '@/src/services/comment/comment.interface'

export const CommentService = {
    async create(text: string, articleId: number) {
        return axiosClassic.post<IComment>(getCommentUrl(`/${articleId}`), { text })
    },
}