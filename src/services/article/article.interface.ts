import { RawDraftContentState } from 'draft-js'
import { IComment } from '@/src/services/comment/comment.interface'

export interface IArticle {
    id: number
    title: string
    content: RawDraftContentState
    shortContent: string
    createdAt: Date
    updatedAt: Date
    comments: IComment[]
}

export interface IArticleCreate {
    content: string
    shortContent: string
    title: string
}

export interface IArticleUpdate {
    title: string
}

export interface IArticleResponse {
    articles: IArticle[]
    pageInfo: PageInfo
}

interface PageInfo {
    currentPage: number
    totalPages: number
    remainingPages: number
}